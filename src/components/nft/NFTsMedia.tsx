import React from 'react';

// components
import { MediaContentsUnStable } from '@components/ui/Media';
import { ItemTypeVideoIcon, LikeButton } from './_components';

// types
import type { ItemSchema } from '@api/schema/item';

interface NFTsMediaProps {
  item: ItemSchema | undefined;
}

const NFTsMedia: React.FC<NFTsMediaProps> = ({ item }) => {
  return (
    <div className="relative">
      <MediaContentsUnStable media={item?.file} imageProps={{ radius: 'md' }} />
      {/* META TYPE */}
      {item?.file.mediaType === 'VIDEO' && (
        <ItemTypeVideoIcon className="absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10" />
      )}
      {/* META FAVORITES */}
      <LikeButton className="absolute right-3 top-3" />
    </div>
  );
};

export default NFTsMedia;
