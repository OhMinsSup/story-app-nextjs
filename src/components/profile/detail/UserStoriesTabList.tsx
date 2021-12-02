import React, { useRef } from 'react';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StoriesGridItem from '@components/common/StoriesGridItem';

// hooks
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useStoriesQuery } from '@api/story/story';
import { useRouter } from 'next/router';

interface UserStoriesTabListProps {}
const UserStoriesTabList: React.FC<UserStoriesTabListProps> = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data, fetchNextPage, hasNextPage } = useStoriesQuery(
    {
      ...(id && {
        userId: parseInt(id, 10),
      }),
    },
    !!id,
  );

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <Box sx={{ width: '100%' }} className="space-y-5">
      <Grid container spacing={3}>
        {data?.pages.map((item, i) => (
          <React.Fragment key={i}>
            {item.list.map((story) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={story.id}>
                <StoriesGridItem item={story} />
              </Grid>
            ))}
          </React.Fragment>
        ))}
        {hasNextPage &&
          Array.from({ length: 10 }).map((_, index) => (
            <Grid
              item
              ref={index === 0 ? loadMoreRef : undefined}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={`nft-next-loading-${index}`}
            >
              <StoriesGridItem.Skeleton />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserStoriesTabList;
