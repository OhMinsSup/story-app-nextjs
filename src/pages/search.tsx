import React from 'react';
import StickyBox from 'react-sticky-box';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import AppLayout from '@components/ui/layouts/AppLayout';
import Container from '@components/search/common/Container';
import FilterBox from '@components/search/filter/FilterBox';
import StoriesGridItem from '@components/common/StoriesGridItem';

const SearchPage = () => {
  return (
    <div>
      <Container>
        <div className={`flex pt-8 pb-16 lg:pb-20`}>
          <div className="flex-shrink-0 pe-24 hidden lg:block w-72">
            <StickyBox offsetTop={50} offsetBottom={20}>
              <FilterBox />
            </StickyBox>
          </div>

          <Box sx={{ width: '100%' }} className="space-y-5 px-8">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StoriesGridItem.Skeleton />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StoriesGridItem.Skeleton />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StoriesGridItem.Skeleton />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StoriesGridItem.Skeleton />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StoriesGridItem.Skeleton />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StoriesGridItem.Skeleton />
              </Grid>
            </Grid>
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;

SearchPage.Layout = AppLayout;
