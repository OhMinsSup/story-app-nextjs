import { createSignedUrlAPI, presigendS3uploadAPI } from '../api/file';

export const useUpload = () => {
  const promise = new Promise<File | null>((resolve, reject) => {
    const input = document.createElement('input');
    const timeout = setTimeout(reject, 1000 * 60 * 3);
    input.type = 'file';
    input.onchange = () => {
      clearTimeout(timeout);
      if (!input.files) return reject();
      const file = input.files[0];
      return resolve(file);
    };
    input.click();
  });
  return promise;
};

export const useS3Upload = async (file: File, info: { type: string; refId?: string }) => {
  if (file.size > 1024 * 1024 * 15) {
    const e = new Error('File is too big');
    e.name = 'FileToBig';
    throw e;
  }

  if (!file.type.includes('image/')) {
    const e = new Error('Not an image');
    e.name = 'NotAnImage';
    throw e;
  }

  try {
    const { presignedUrl, imageUrl } = await createSignedUrlAPI(file, {
      fileType: info.type,
      ...(info.refId && { refId: info.refId }),
    });

    if (!presignedUrl) {
      const e = new Error('Presigned Url is Empty');
      e.name = 'EmptyPresigned';
      throw e;
    }

    await presigendS3uploadAPI(presignedUrl, file);
    return imageUrl;
  } catch (e) {
    console.error(e);
  }
};
