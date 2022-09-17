import React, { useCallback } from 'react';
import { Text, Button } from '@mantine/core';

// components
import { openModal, closeAllModals } from '@mantine/modals';

// hooks
import { useWorker } from '@koale/useworker';
import { useUploadMutation } from '@api/mutations';

// utils
import parseByBytes from 'magic-bytes.js';
import { isEmpty } from '@utils/assertion';

// types
import type { mp4box } from 'global';
import { MediaType, MEDIA_TYPE } from '@api/schema/story-api';
import { useMemoizedFn } from './useMemoizedFn';

const remoteDependencies = [
  'https://cdn.jsdelivr.net/npm/mp4box@0.5.2/dist/mp4box.all.min.js',
];

interface UseItemMediaWorkerParams {
  onSuccess: (data: any) => void;
}

export const useItemMediaWorker = (params: UseItemMediaWorkerParams) => {
  const [worker] = useWorker(webcodecsFn, {
    autoTerminate: true,
    remoteDependencies,
  });

  const { mutateAsync, isLoading } = useUploadMutation({
    onSuccess: params.onSuccess,
  });

  const openUploadErrorModal = useCallback(
    (message: string) =>
      openModal({
        title: '업로드 에러',
        centered: true,
        children: (
          <>
            <Text size="sm">{message}</Text>
            <Button
              onClick={() => closeAllModals()}
              mt="md"
              className="float-right"
            >
              확인
            </Button>
          </>
        ),
      }),
    [],
  );

  const onUpload = async (files: File[]) => {
    const file = files[0];
    if (!file || isEmpty(file)) return;

    const mimeType = await getmimeFn(file);
    if (!mimeType) {
      return openUploadErrorModal('올바른 업로드 형식의 파일을 등록해주세요.');
    }

    let mediaType: MediaType | undefined;
    // mime type이
    if (mimeType.match(/^image\/(jpeg|png|gif|jpg|webp)$/)) {
      mediaType = MEDIA_TYPE.IMAGE;
    } else if (mimeType.match(/^video\/(mp4)$/)) {
      mediaType = MEDIA_TYPE.VIDEO;
    } else if (mimeType.match(/^model\/(glb|gltf|ply|zip)$/)) {
      mediaType = MEDIA_TYPE.MODEL;
    }

    if (!mediaType) {
      return openUploadErrorModal('올바른 업로드 형식의 파일을 등록해주세요.');
    }

    const body = {
      file,
      uploadType: 'NFT',
      mediaType,
    } as const;

    if (mimeType.includes('image')) {
      await mutateAsync(body);
    } else if (mimeType.includes('video') || mimeType.includes('audio')) {
      // https://caniuse.com/mdn-api_mediasource_istypesupported
      // https://developer.mozilla.org/ko/docs/Web/Media/Formats/Video_codecs
      // https://developer.mozilla.org/ko/docs/Web/Media/Formats/codecs_parameter
      const webcodecs = await worker(file);
      const tracks = webcodecs.tracks
        .filter((t) => ['video', 'audio'].includes(t.type))
        .map((t) => ({
          type: t.type,
          codec: t.codec,
        }));
      // 'video/mp4; codecs="avc1.4d400c,mp4a.40.2,mp4a.40.2"'
      const mimeCodec = `${file.type}; codecs="${tracks
        .map((t) => t.codec)
        .join(',')}"`;
      if ('MediaSource' in window && MediaSource.isTypeSupported(mimeCodec)) {
        console.log('supported MIME type or codec:', mimeCodec);
        await mutateAsync(body);
      } else {
        console.error('Unsupported MIME type or codec: ', mimeCodec);
        return openUploadErrorModal(
          '브라우저에서 지원하지 않는 코덱 형식입니다.',
        );
      }
    } else {
      return openUploadErrorModal('올바른 업로드 형식의 파일을 등록해주세요.');
    }
  };

  return {
    onUpload: useMemoizedFn(onUpload),
    isLoading,
  };
};

function getmimeFn(file: File) {
  return new Promise<string | null>((resolve) => {
    const fileReader = new FileReader();
    fileReader.onloadend = (e) => {
      if (!e.target) return resolve(null);
      const bytes = new Uint8Array(e.target.result as ArrayBuffer);
      // https://en.wikipedia.org/wiki/List_of_file_signatures.
      // https://github.com/sindresorhus/file-type
      // https://mimesniff.spec.whatwg.org/#matching-an-image-type-pattern
      // https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
      const result = parseByBytes(bytes);
      const guessedFile = result[0];
      if (!guessedFile) return resolve(null);
      if (!guessedFile.mime) return resolve(null);
      resolve(guessedFile.mime);
    };
    fileReader.onerror = () => {
      return resolve(null);
    };
    fileReader.readAsArrayBuffer(file);
  });
}

// web worker env
const webcodecsFn = (blob: File) => {
  return new Promise<mp4box.MP4Info>((resolve, reject) => {
    const objectURL = URL.createObjectURL(blob);
    self.fetch(objectURL).then((resp) => {
      const file = self.MP4Box.createFile();
      file.onError = (e: unknown) => {
        URL.revokeObjectURL(objectURL);
        return reject(e);
      };

      file.onReady = (info: any) => {
        URL.revokeObjectURL(objectURL);
        return resolve(info);
      };

      const reader = resp.body?.getReader();
      let offset = 0;
      // eslint-disable-next-line prefer-const
      let mp4File = file;

      function appendBuffers({ done, value }: Record<string, any>): any {
        if (done) {
          mp4File.flush();
          return;
        }

        // eslint-disable-next-line prefer-const
        let buf = value.buffer;
        buf.fileStart = offset;

        offset += buf.byteLength;

        mp4File.appendBuffer(buf);

        return reader?.read().then(appendBuffers);
      }
      reader?.read().then(appendBuffers);
    });
  });
};
