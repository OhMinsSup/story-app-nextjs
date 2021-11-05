import React from 'react';
import Image from 'next/image';
import Box from '@mui/system/Box';
import Skeleton from '@mui/material/Skeleton';

interface ImageViewerProps {}
const ImageViewer: React.FC<ImageViewerProps> = () => {
  return (
    <Box component="div">
      <div
        className="flex p-16 justify-center"
        style={{ backgroundColor: 'ButtonFace' }}
      >
        <Image
          src="/images/card.jpg"
          width={600}
          height={500}
          loading="lazy"
          alt="image viewer"
        />
      </div>
    </Box>
  );
};

export default ImageViewer;
