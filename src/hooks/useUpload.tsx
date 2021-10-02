import { useCallback, useState } from 'react';

const useUpload = (accept?: string) => {
  const [file, setFile] = useState<File | null>(null);

  const upload = useCallback(() => {
    const promise = new Promise<File | null>((resolve, reject) => {
      const input = document.createElement('input');

      const timeout = setTimeout(reject, 1000 * 60 * 3);
      input.type = 'file';
      input.accept = accept ?? 'image/*';
      input.onchange = () => {
        clearTimeout(timeout);
        if (!input.files) return reject();

        const file = input.files[0];
        setFile(file);
        resolve(file);
      };
      input.click();
    });
    return promise;
  }, []);

  const clear = useCallback(() => {
    setFile(null);
  }, []);

  return [file, upload, clear] as [typeof file, typeof upload, typeof clear];
};

export default useUpload;
