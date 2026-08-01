'use client';

import { useEffect, useRef, useState } from 'react';
import {
  isCameraSupported,
  processImage,
  revokePreviewUrl,
  type MediaCaptureMode,
  type MediaCaptureStep,
} from '@/lib/gooday/media';
import { useBodyScrollLock } from '@/lib/gooday/uiGuards';
import { CameraCapture } from './CameraCapture';
import { ImagePreview } from './ImagePreview';
import { MediaSourceSelector } from './MediaSourceSelector';

export type MediaCaptureResult = {
  file: File;
  previewUrl: string;
};

type Props = {
  open: boolean;
  mode: MediaCaptureMode;
  onClose: () => void;
  onConfirm: (result: MediaCaptureResult) => void;
  onError: (message: string) => void;
};

export function MediaCaptureOverlay({ open, mode, onClose, onConfirm, onError }: Props) {
  const [step, setStep] = useState<MediaCaptureStep>('source');
  const [busy, setBusy] = useState(false);
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);
  const [reviewFile, setReviewFile] = useState<File | null>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const nativeCameraInputRef = useRef<HTMLInputElement>(null);
  const cameraAvailable = isCameraSupported();

  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) {
      revokePreviewUrl(reviewUrl);
      setReviewUrl(null);
      setReviewFile(null);
      setBusy(false);
      setStep('source');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- limpa ao fechar
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busy) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, busy, onClose]);

  if (!open) return null;

  const prepareReview = async (file: File) => {
    setBusy(true);
    try {
      const processed = await processImage(file, { mode });
      revokePreviewUrl(reviewUrl);
      setReviewFile(processed.file);
      setReviewUrl(processed.previewUrl);
      setStep('review');
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Não foi possível processar a imagem.');
      setStep('source');
    } finally {
      setBusy(false);
    }
  };

  const handleGalleryChange = async (files: FileList | null, preferNativeCameraFallback = false) => {
    const file = files?.[0];
    if (!file) {
      if (preferNativeCameraFallback) setStep('source');
      return;
    }
    await prepareReview(file);
    if (galleryInputRef.current) galleryInputRef.current.value = '';
    if (nativeCameraInputRef.current) nativeCameraInputRef.current.value = '';
  };

  const handleConfirmReview = () => {
    if (!reviewFile || !reviewUrl) return;
    onConfirm({ file: reviewFile, previewUrl: reviewUrl });
    // Ownership of previewUrl passa ao composer — não revogar aqui.
    setReviewUrl(null);
    setReviewFile(null);
    setStep('source');
  };

  const handleRetake = () => {
    revokePreviewUrl(reviewUrl);
    setReviewUrl(null);
    setReviewFile(null);
    if (cameraAvailable) setStep('camera');
    else setStep('source');
  };

  return (
    <div className="fixed inset-0 z-[90]">
      {step === 'source' ? (
        <div
          className="flex h-full w-full items-end justify-center bg-black/70 p-0 backdrop-blur-sm min-[800px]:items-center min-[800px]:p-6"
          onClick={(e) => {
            if (e.target === e.currentTarget && !busy) onClose();
          }}
        >
          <MediaSourceSelector
            mode={mode}
            cameraAvailable={cameraAvailable}
            onCamera={() => {
              if (cameraAvailable) setStep('camera');
              else nativeCameraInputRef.current?.click();
            }}
            onGallery={() => galleryInputRef.current?.click()}
            onCancel={onClose}
          />
        </div>
      ) : null}

      {step === 'camera' ? (
        <CameraCapture
          mode={mode}
          initialFacing="environment"
          onCapture={(file) => void prepareReview(file)}
          onClose={() => setStep('source')}
          onError={(message) => {
            onError(message);
            setStep('source');
          }}
        />
      ) : null}

      {step === 'review' && reviewUrl ? (
        <ImagePreview
          mode={mode}
          src={reviewUrl}
          busy={busy}
          onRetake={handleRetake}
          onConfirm={handleConfirmReview}
          onClose={onClose}
        />
      ) : null}

      {busy && step !== 'review' ? (
        <div className="pointer-events-none absolute inset-0 z-[96] grid place-items-center bg-black/40">
          <p className="rounded-full bg-black/70 px-4 py-2 text-sm text-white" role="status">
            Processando imagem…
          </p>
        </div>
      ) : null}

      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => void handleGalleryChange(e.target.files)}
      />
      <input
        ref={nativeCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        aria-hidden
        tabIndex={-1}
        onChange={(e) => void handleGalleryChange(e.target.files, true)}
      />
    </div>
  );
}
