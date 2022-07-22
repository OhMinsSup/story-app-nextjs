import React, { useCallback } from 'react';
import classNames from 'classnames';

// atom
import { useImageAtom } from '@atoms/editorAtom';

// components
import { BlurImage } from '@components/ui/Image';

// types
import type { MediaSchema } from '@api/schema/story-api';

interface FileImageProps {
  item: MediaSchema;
}

const FileImage: React.FC<FileImageProps> = ({ item }) => {
  const [state, setState] = useImageAtom();

  const onClick = useCallback(() => {
    setState({
      idx: item.id,
      name: item.publidId,
      contentUrl: item.contentUrl,
    });
  }, [item, setState]);

  return (
    <div
      role="button"
      aria-label="select image"
      className={classNames(
        'w-64 min-h-[180px] mx-auto mb-12 rounded-lg cursor-pointer md:mx-2',
        {
          'border border-indigo-500/100 border-solid': item.id === state?.idx,
        },
      )}
      onClick={onClick}
    >
      <BlurImage
        layout="responsive"
        src={item.contentUrl}
        className="bg-cover"
        alt={`nft content ${item.publidId}`}
        width={256}
        height={256}
        objectFit="cover"
      />
    </div>
  );
};

export default FileImage;
