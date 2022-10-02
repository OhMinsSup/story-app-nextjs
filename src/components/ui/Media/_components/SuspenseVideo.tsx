import React, { useCallback, useRef } from 'react';
import { getTargetElement } from '@libs/browser-utils';
import { MediaResource } from '../_internal/resource';

// types
import type { Nullable } from '@utils/assertion';
import type { FileSchema } from '@api/schema/file';
import type { UploadRespSchema } from '@api/schema/resp';

interface SuspenseVideoProps {
  media?: Nullable<FileSchema | UploadRespSchema>;
  hiddenPlayBtn?: boolean;
}

const SuspenseVideo: React.FC<SuspenseVideoProps> = (props) => {
  const ref = useRef<HTMLVideoElement | null>(null);

  const onClickSinglePlayButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      e.stopPropagation();

      const btnEle = e.currentTarget;
      const ele = getTargetElement(ref);

      // 비디오 재생
      if (ele?.paused) {
        btnEle.classList.add('pause');
        ele?.play();
      } else {
        btnEle.classList.remove('pause');
        ele?.pause();
      }
    },
    [],
  );

  if (props.media) {
    const resource = MediaResource(props.media, 'VIDEO');

    resource.load();
    resource.read();
  }

  const poster = props?.media?.secureUrl;

  return (
    <>
      <video
        ref={ref}
        loop
        playsInline
        preload="none"
        poster={poster}
        src={props?.media?.secureUrl}
        width="100%"
      />
      {/* {!props.hiddenPlayBtn && (
        <button
          type="button"
          className="btn-play-detail"
          aria-label="video play button"
          onClick={onClickSinglePlayButton}
        ></button>
      )} */}
    </>
  );
};

export default SuspenseVideo;
