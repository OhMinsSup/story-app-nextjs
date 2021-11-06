import React from 'react';
import Image from 'next/image';
import Box from '@mui/system/Box';

import { blurDataUrl } from '@utils/utils';

interface ImageViewerProps {}
const ImageViewer: React.FC<ImageViewerProps> = () => {
  return (
    <Box component="div">
      <div
        className="flex p-16 justify-center"
        style={{ backgroundColor: '#0ca678' }}
      >
        <Image
          src="/images/card.jpg"
          width={600}
          height={500}
          loading="lazy"
          placeholder="blur"
          blurDataURL={blurDataUrl(600, 500)}
          alt="image viewer"
        />
      </div>
    </Box>
  );
};

export default ImageViewer;
