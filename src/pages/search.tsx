import React, { useRef } from 'react';
import qs from 'qs';

import StickyBox from 'react-sticky-box';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import AppLayout from '@components/ui/layouts/AppLayout';
import Container from '@components/search/common/Container';
import FilterBox from '@components/search/filter/FilterBox';
import StoriesGridItem from '@components/common/StoriesGridItem';
import SortingSelect from '@components/search/filter/SortingSelect';

import { useSearchQuery } from '@api/story/search';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';
import { useRouter } from 'next/router';

const SearchPage = () => {
  const router = useRouter();
  const query = router.query as Record<string, any>;
  const parsedQuery: Record<string, any> | undefined = qs.parse(query, {
    comma: true,
  });

  const { data, fetchNextPage, hasNextPage } = useSearchQuery({
    tags: parsedQuery?.tags ?? [],
    backgrounds: parsedQuery?.color ?? [],
    orderType: parsedQuery?.orderType ?? 'createdAt',
    orderBy: parsedQuery?.orderBy ?? 'desc',
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div>
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 pe-24 hidden lg:block w-72">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <FilterBox />
            </StickyBox>
          </div>

          <Box sx={{ width: '100%' }} className="space-y-5 md:pl-8">
            <SortingSelect />
            <Grid container spacing={1}>
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
                    xl={2}
                    key={`nft-next-loading-${index}`}
                  >
                    <StoriesGridItem.Skeleton />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;

SearchPage.Layout = AppLayout;
