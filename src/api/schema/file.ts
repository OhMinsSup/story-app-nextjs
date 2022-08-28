import type { MediaType, UploadType } from './story-api';

export interface FileSchema {
  id: number;
  publicId: string;
  version: number;
  signature: string;
  format: string;
  resourceType: string;
  url: string;
  secureUrl: string;
  uploadType: UploadType;
  mediaType: MediaType;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
