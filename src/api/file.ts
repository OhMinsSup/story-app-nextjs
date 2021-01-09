import axios from 'axios';
import client from './client';
import type { PresignedUrlModelResponse } from './models/file/presigned-url.model';

export const presigendS3uploadAPI = async (url: string, file: File) => {
  try {
    const response = await axios.put(url, file, {
      headers: {
        // 'application/octet-stream',
        'Content-Type': file.type,
      },
    });
    return response;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const createSignedUrlAPI = async (file: File, info: { fileType: string; refId?: string }) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileType', info.fileType);
    if (info.refId) {
      formData.append('refId', info.refId);
    }

    const { data } = await client.post<PresignedUrlModelResponse>('/file/upload-url', formData, {
      headers: {
        'Content-Type': ' multipart/form-data',
      },
    });

    // if (!presignedUrl) {
    //   throw new Error('PRESIGNED_URL_IS_EMPTY');
    // }

    // await s3upload(presignedUrl, file);

    return data;
  } catch (e) {
    console.error(e);
  }
};
