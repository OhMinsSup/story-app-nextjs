import React, { useCallback } from 'react';
import { Text, Button } from '@mantine/core';

// components
import { openModal, closeAllModals } from '@mantine/modals';

// hooks
import { useUploadMutation } from '@api/mutations';

// utils
import { isEmpty } from '@utils/assertion';

// types
import { MediaType, MEDIA_TYPE } from '@api/schema/story-api';
import { useMemoizedFn } from './useMemoizedFn';
import { getCodecInfo, getMimeInfo } from '@utils/utils';
import { isWebApiSupported } from '@libs/browser-utils';

interface UseUploadParams {
  onSuccess: (data: any) => void;
}

export const useUpload = (params: UseUploadParams) => {
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

    const mimeType = await getMimeInfo(file);
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

    // 이미지인 경우 최대 10mb, 비디오인 경우 최대 20mb
    if (mediaType === MEDIA_TYPE.IMAGE) {
      if (file.size > 10485760) {
        return openUploadErrorModal(
          '이미지는 최대 10MB까지 업로드 가능합니다.',
        );
      }
    } else if (mediaType === MEDIA_TYPE.VIDEO) {
      if (file.size > 20971520) {
        return openUploadErrorModal(
          '동영상은 최대 10MB까지 업로드 가능합니다.',
        );
      }

      const { mime, tracks } = await getCodecInfo(file);
      if (isWebApiSupported('MediaSource')) {
        const supported = MediaSource.isTypeSupported(mime);
        if (!supported) {
          return openUploadErrorModal('지원하지 않는 동영상 형식입니다.');
        }
        return await mutateAsync(body);
      }
      if (isEmpty(tracks)) {
        return openUploadErrorModal('지원하지 않는 동영상 형식입니다.');
      }
      // web api 미지원인 경우 codec 정보를 통해 지원여부 확인
      // MP4 video with H264 encoding for video and AAC for audio validation check
      const validate = tracks.every((track) => {
        const { codec, type } = track;
        if (type === 'audio') {
          return codec.includes('avc1');
        }

        if (type === 'video') {
          return codec.includes('mp4a');
        }
      });

      if (!validate) {
        return openUploadErrorModal('지원하지 않는 동영상 형식입니다.');
      }

      return await mutateAsync(body);
    } else if (mediaType === MEDIA_TYPE.MODEL) {
      return null;
    }
  };

  return {
    onUpload: useMemoizedFn(onUpload),
    isLoading,
  };
};
