import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Box from '@mui/system/Box';

// utils
import { blurDataUrl } from '@utils/utils';

// api
import { useStoryQuery } from '@api/story/story';

interface ImageViewerProps {}
const ImageViewer: React.FC<ImageViewerProps> = () => {
  const router = useRouter();
  const id = router.query.id?.toString();
  const { data } = useStoryQuery(id);

  return (
    <Box component="div">
      <div
        className="flex p-16 justify-center"
        style={{ backgroundColor: data?.result.backgroundColor }}
      >
        {data?.result.media.contentUrl && (
          <Image
            src={data.result.media.contentUrl}
            width={600}
            height={500}
            loading="lazy"
            placeholder="blur"
            blurDataURL={blurDataUrl(600, 500)}
            alt={`${data?.result.name} image`}
          />
        )}
      </div>
    </Box>
  );
};

export default ImageViewer;
