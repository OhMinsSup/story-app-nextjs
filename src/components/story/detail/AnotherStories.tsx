import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import isEmpty from 'lodash-es/isEmpty';

import { Pagination } from 'swiper';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import StoriesGridItem from '@components/common/StoriesGridItem';

import { useAnothersQuery } from '@api/story/story';

import type { DataIdParams } from '@api/schema/story-api';

interface AnotherStoriesProps {
  userId: DataIdParams;
  storyId: DataIdParams;
}
const AnotherStories: React.FC<AnotherStoriesProps> = ({ storyId, userId }) => {
  const { data } = useAnothersQuery(storyId, userId);
  if (!data || isEmpty(data?.list)) return null;

  return (
    <Stack spacing={1}>
      <Typography variant="h5" gutterBottom className="font-bold">
        작가의 다른 작품
      </Typography>
      <Box className="space-x-3">
        <Swiper
          modules={[Pagination]}
          slidesPerView={3}
          spaceBetween={30}
          pagination={{
            dynamicBullets: true,
          }}
          className="mySwiper"
        >
          {data?.list.map((item) => (
            <SwiperSlide key={`another-${item.id}`}>
              <StoriesGridItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Stack>
  );
};

export default AnotherStories;
