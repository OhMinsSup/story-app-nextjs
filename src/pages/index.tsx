import React from 'react';

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
  const { data, isLoading } = useIllustractionsQuery();

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const items = data?.items ?? [];

  return (
    <div>
      <Box sx={{ flexGrow: 1, bgcolor: grey[50] }}>
        <Box sx={{ width: '100%' }} className="space-y-5 pt-8">
          <Box sx={{ borderBottom: 1, borderColor: 'transparent' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="inherit"
              indicatorColor="secondary"
              centered
              aria-label="basic tabs example"
            >
              <Tab label="최신순" {...a11yProps(0)} />
              <Tab label="트렌딩" {...a11yProps(1)} />
              <Tab label="아무개" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={3} direction="row" justifyContent="center">
              {isLoading ? (
                <>
                  {Array.from({ length: 30 }).map((_, index) => (
                    <Grid
                      item
                      columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                      key={`nft-loading-${index}`}
                    >
                      <NFTCard.Skeleton />
                    </Grid>
                  ))}
                </>
              ) : (
                items.map((item) => (
                  <Grid
                    item
                    columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                    key={`nft-${item.tokenId}`}
                  >
                    <NFTCard item={item} />
                  </Grid>
                ))
              )}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={3} direction="row" justifyContent="center">
              {items.map((item) => (
                <Grid
                  item
                  columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                  key={`nft-${item.tokenId}`}
                >
                  <NFTCard item={item} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Grid container spacing={3} direction="row" justifyContent="center">
              {items.map((item) => (
                <Grid
                  item
                  columns={{ xl: 4, xs: 4, lg: 3, md: 3, sm: 5 }}
                  key={`nft-${item.tokenId}`}
                >
                  <NFTCard item={item} />
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
};

export default IndexPage;

IndexPage.Layout = AppLayout;
