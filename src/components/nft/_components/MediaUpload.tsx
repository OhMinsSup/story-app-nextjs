import React, { useRef } from 'react';
import type { UploadRespSchema } from '@api/schema/resp';
import type { Nullable } from '@utils/assertion';
import { MediaContentsUnStable } from '@components/ui/Media';
import { useDrop } from '@hooks/useDrop';
import { useUpload } from '@hooks/useUpload';
import { UploadIcon } from '@components/ui/Icon';

interface InfoProps {}

const Info: React.FC<InfoProps> = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useDrop(ref, {
    onDragOver(event?) {
      console.log('onDragOver', event);
    },
    onDragLeave(event?) {
      console.log('onDragLeave', event);
    },
    onDrop(event?) {
      console.log('onDrop', event);
    },
    onPaste(event?) {
      console.log('onPaste', event);
    },
  });

  return (
    <div
      ref={ref}
      className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-xl cursor-pointer"
    >
      <div className="space-y-1 text-center">
        <UploadIcon className="mx-auto h-12 w-12 text-neutral-400" />
        <div className="flex text-sm text-neutral-6000 dark:text-neutral-300 items-center">
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer  rounded-md font-medium text-gray-600 hover:text-gray-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:text-gray-500"
          >
            <span>Upload a file</span>
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
      </div>
    </div>
  );
};

interface MediaUploadProps {
  media: Nullable<UploadRespSchema>;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ media }) => {
  const { isLoading, onUpload } = useUpload({
    onSuccess: (data) => console.log(data),
  });

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-semibold">
        Image, Video, Audio, or 3D Model
      </h3>
      <span className="text-neutral-500 dark:text-neutral-400 text-sm">
        지원되는 파일 형식: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB,
        GLTF. 최대 크기: 10MB
      </span>
      <div className="mt-5">
        {media ? <MediaContentsUnStable media={media} /> : <Info />}
      </div>
    </div>
  );
};

export default MediaUpload;
