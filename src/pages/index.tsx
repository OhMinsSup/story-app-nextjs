import React, { useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';

// components
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { grey } from '@mui/material/colors';

import AppLayout from '@components/layouts/AppLayout';
import NFTCard from '@components/common/NFTCard';

import { useIllustractionsQuery } from '@api/local/get-mock-illustractions';
import { useInfiniteQuery } from 'react-query';
import { api } from '@api/module';
import { API_ENDPOINTS } from '@constants/constant';
import { ListSchema } from 'types/story-api';
import { useStoriesQuery } from '@api/story/story';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const IndexPage = () => {
  // const { data, isLoading } = useIllustractionsQuery();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // const items = data?.items ?? [];

  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useStoriesQuery();

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  });

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ width: '100%' }} className="space-y-5 pt-8">
          <Grid container spacing={3} direction="row" justifyContent="center">
            {data?.pages.map((item, i) => (
              <React.Fragment key={i}>
                {item.list.map((store) => (
                  <Grid
                    item
                    columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                    key={`nft-${store.id}`}
                  >
                    <NFTCard item={store} />
                  </Grid>
                ))}
              </React.Fragment>
            ))}

            {hasNextPage &&
              Array.from({ length: 10 }).map((_, index) => (
                <Grid
                  item
                  ref={index === 0 ? loadMoreRef : undefined}
                  columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                  key={`nft-next-loading-${index}`}
                >
                  <NFTCard.Skeleton />
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </div>
  );
};

export default IndexPage;

IndexPage.Layout = AppLayout;
