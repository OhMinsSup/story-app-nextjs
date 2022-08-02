import React from 'react';
import { MediaContent, ItemTypeVideoIcon, LikeButton } from './_components';

const NFTsMedia = () => {
  return (
    <div className="relative">
      <MediaContent containerClassName="aspect-w-11 aspect-h-12 rounded-3xl overflow-hidden" />
      {/* META TYPE */}
      <ItemTypeVideoIcon className="absolute left-3 top-3  w-8 h-8 md:w-10 md:h-10" />
      {/* META FAVORITES */}
      <LikeButton className="absolute right-3 top-3 " />
    </div>
  );
};

export default NFTsMedia;
