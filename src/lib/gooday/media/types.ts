export type MediaFacingMode = 'user' | 'environment';

export type MediaCaptureMode = 'post' | 'story';

export type MediaCaptureStep = 'source' | 'camera' | 'review';

export type ProcessedMedia = {
  file: File;
  previewUrl: string;
  width: number;
  height: number;
};

export type UploadKind = 'post' | 'story';

export type UploadResult = {
  publicUrl: string;
  path: string;
  bucket: string;
};

export type ProcessImageOptions = {
  mode: MediaCaptureMode;
  /** 0–1 JPEG quality */
  quality?: number;
};
