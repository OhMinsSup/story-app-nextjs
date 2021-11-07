import React from 'react';
import Image from 'next/image';

import Box from '@mui/system/Box';
import Skeleton from '@mui/material/Skeleton';

// utils
import { blurDataUrl } from '@utils/utils';

interface ImageViewerProps {
  backgroundColor: string;
  imageUrl: string;
  name: string;
}
function ImageViewer({
  backgroundColor,
  imageUrl,
  name,
}: Partial<ImageViewerProps>) {
  return (
    <Box component="div">
      <div className="flex p-16 justify-center" style={{ backgroundColor }}>
        {imageUrl && (
          <Image
            src={imageUrl}
            width={600}
            height={500}
            loading="lazy"
            placeholder="blur"
            blurDataURL={blurDataUrl(600, 500)}
            alt={`${name} image`}
          />
        )}
      </div>
    </Box>
  );
}

export default ImageViewer;

// eslint-disable-next-line react/display-name
ImageViewer.Skeleton = () => (
  <Box component="div">
    <div className="flex p-16 justify-center">
      <Skeleton
        sx={{ height: '500px', width: '600px' }}
        animation="wave"
        variant="rectangular"
      />
    </div>
  </Box>
);
