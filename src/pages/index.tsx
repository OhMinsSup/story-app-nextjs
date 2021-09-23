import React from 'react';

// components
import Box from '@mui/material/Box';
import Masonry from '@mui/lab/Masonry';
import MasonryItem from '@mui/lab/MasonryItem';
import Container from '@mui/material/Container';

import AppLayout from '@components/layouts/AppLayout';
import { useIllustractionsQuery } from '@api/local/get-mock-illustractions';

const IndexPage = () => {
  const result = useIllustractionsQuery();

  const items = result.data?.items ?? [];

  console.log('items', items);

  return (
    <Container maxWidth="xl">
      <Box p={3}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          sx={{ height: '100%' }}
          spacing={2}
        >
          {items.map((item, i) => {
            console.log(i, item);
            return (
              <MasonryItem key={item.tokenId}>
                <img src={item.image} alt={item.name} loading="lazy" />
              </MasonryItem>
            );
          })}
        </Masonry>
      </Box>
    </Container>
  );
};

export default IndexPage;

IndexPage.Layout = AppLayout;
