import React, { useCallback, useRef, useState } from 'react';
import classNames from 'classnames';

// utils
import { isEmpty, Nullable } from '@utils/assertion';
import { getTargetElement } from '@libs/browser-utils';

// components
import { UploadIcon } from '@components/ui/Icon';
import { Loader, CloseButton, Box, Text } from '@mantine/core';
import { CloudUploadIcon } from '@heroicons/react/outline';
import { MediaContentsUnStable } from '@components/ui/Media';

// hooks
import { useDrop } from '@hooks/useDrop';
import { useUpload } from '@hooks/useUpload';

import type { UploadRespSchema } from '@api/schema/resp';

interface InfoProps {
  isLoading: boolean;
  onDrop: (files: File[]) => void;
}

type DropState = 'init' | 'over' | 'drop';

const Info: React.FC<InfoProps> = ({ onDrop, isLoading }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [dropState, setDropState] = useState<DropState>('init');

  useDrop(ref, {
    onDragOver() {
      setDropState('over');
    },
    onDragLeave() {
      setDropState('init');
    },
    onDrop() {
      setDropState('drop');
    },
    onFiles(files) {
      onDrop(files);
    },
  });

  const onUploadStart = useCallback(() => {
    const ele = getTargetElement(inputRef);
    if (!ele) {
      throw new Error('No target element');
    }

    if (ele instanceof HTMLInputElement) {
      if (ele.value) ele.value = '';
    }

    inputRef.current?.click();
  }, []);

  const onUploadChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files || isEmpty(files)) {
        throw new Error('No file');
      }
      const file = files[0];
      if (!file) {
        throw new Error('No file');
      }

      onDrop?.([file]);
    },
    [onDrop],
  );

  return (
    <div
      ref={ref}
      onClick={onUploadStart}
      className={classNames(
        'mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer',
        {
          'border-blue-600': dropState === 'over',
        },
      )}
    >
      <div className="space-y-1 text-center">
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {dropState === 'over' ? (
                <CloudUploadIcon className="mx-auto h-12 w-12 text-blue-600" />
              ) : (
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
              )}
              <div
                className={classNames(
                  'flex text-sm text-gray-400 items-center',
                  {
                    'text-blue-400': dropState === 'over',
                  },
                )}
              >
                <label
                  htmlFor="file-upload"
                  className={classNames(
                    'relative cursor-pointer rounded-md font-medium text-gray-600',
                    {
                      'text-blue-600': dropState === 'over',
                    },
                  )}
                >
                  <span>Upload a file or drag and drop</span>
                </label>
              </div>
              <input
                ref={inputRef}
                hidden
                type="file"
                // accept={accept.join(',')}
                onChange={onUploadChange}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
};

interface MediaUploadProps {
  title?: string;
  description?: string;
  media: Nullable<UploadRespSchema>;
  onUploaded: (data: any) => void;
  onUploadRemove: () => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  title = 'Image, Video, Audio, or 3D Model',
  description = `지원되는 파일 형식: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
  GLTF. 최대 크기: 10MB`,
  media,
  onUploaded,
  onUploadRemove,
}) => {
  const { isLoading, onUpload } = useUpload({
    onSuccess: onUploaded,
  });

  const onDrop = useCallback(
    (files: File[]) => {
      if (!files) return;
      onUpload(files);
    },
    [onUpload],
  );

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
      <span className="text-neutral-500 dark:text-neutral-400 text-sm">
        {description}
      </span>
      <div className="mt-5">
        {media ? (
          <Box className="flex flex-col">
            <div className="flex justify-between pb-2 items-center">
              <Text size="sm" align="left" weight={500}>
                {media.mediaType.toLowerCase()}
              </Text>
              <CloseButton
                title="remove media item"
                size="xl"
                iconSize={20}
                onClick={onUploadRemove}
              />
            </div>
            <MediaContentsUnStable
              media={media}
              videoProps={{ controls: true }}
            />
          </Box>
        ) : (
          <Info onDrop={onDrop} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
