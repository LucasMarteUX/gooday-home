'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cameraErrorMessage, MediaError } from './errors';
import type { MediaFacingMode } from './types';
import { uniqueImageName } from './validateImage';

export function isCameraSupported(): boolean {
  if (typeof navigator === 'undefined') return false;
  return Boolean(navigator.mediaDevices?.getUserMedia);
}

type UseCameraOptions = {
  initialFacing?: MediaFacingMode;
  enabled: boolean;
};

export function useCamera({ initialFacing = 'environment', enabled }: UseCameraOptions) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facing, setFacing] = useState<MediaFacingMode>(initialFacing);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [starting, setStarting] = useState(false);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    const video = videoRef.current;
    if (video) video.srcObject = null;
    setReady(false);
  }, []);

  const startStream = useCallback(
    async (facingMode: MediaFacingMode) => {
      if (!isCameraSupported()) {
        const message = 'Este navegador não oferece suporte à câmera.';
        setError(message);
        throw new MediaError('UNSUPPORTED', message);
      }

      setStarting(true);
      setError(null);
      stopStream();

      try {
        let stream: MediaStream;
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              facingMode: { ideal: facingMode },
              width: { ideal: 1280 },
              height: { ideal: 1920 },
            },
          });
        } catch {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: false,
            video: true,
          });
        }

        streamRef.current = stream;
        setFacing(facingMode);

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.muted = true;
          video.playsInline = true;
          await video.play().catch(() => undefined);
        }

        setReady(true);
      } catch (err) {
        const message = cameraErrorMessage(err);
        setError(message);
        stopStream();
        throw new MediaError('CAMERA_FAILED', message);
      } finally {
        setStarting(false);
      }
    },
    [stopStream],
  );

  const flipCamera = useCallback(async () => {
    const next: MediaFacingMode = facing === 'user' ? 'environment' : 'user';
    await startStream(next);
  }, [facing, startStream]);

  const capturePhoto = useCallback(async (): Promise<File> => {
    const video = videoRef.current;
    if (!video || !ready || video.videoWidth === 0) {
      throw new MediaError('CAPTURE_FAILED', 'Não foi possível capturar a imagem.');
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new MediaError('CAPTURE_FAILED', 'Não foi possível capturar a imagem.');
    }

    // Preview espelhado na frontal; arquivo final sem espelho.
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob((b) => resolve(b), 'image/jpeg', 0.92);
    });

    if (!blob) {
      throw new MediaError('CAPTURE_FAILED', 'Não foi possível capturar a imagem.');
    }

    return new File([blob], uniqueImageName('image/jpeg'), { type: 'image/jpeg' });
  }, [ready]);

  useEffect(() => {
    if (!enabled) {
      stopStream();
      return;
    }

    void startStream(initialFacing).catch(() => undefined);

    return () => {
      stopStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reinicia só ao abrir/fechar
  }, [enabled]);

  return {
    videoRef,
    facing,
    ready,
    starting,
    error,
    startStream,
    stopStream,
    flipCamera,
    capturePhoto,
    supported: isCameraSupported(),
  };
}
