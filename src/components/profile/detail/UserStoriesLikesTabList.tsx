import React, { useRef } from 'react';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StoriesGridItem from '@components/common/StoriesGridItem';

// hooks
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useStoryLikesQuery } from '@api/story/user';
import { useRouter } from 'next/router';

interface UserStoriesLikesTabListProps {}
const UserStoriesLikesTabList: React.FC<UserStoriesLikesTabListProps> = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data, fetchNextPage, hasNextPage } = useStoryLikesQuery(id);

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
              <Grid item xs={12} sm={6} md={4} lg={3} key={`likes-${story.id}`}>
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
              key={`nft-likes-next-loading-${index}`}
            >
              <StoriesGridItem.Skeleton />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default UserStoriesLikesTabList;
