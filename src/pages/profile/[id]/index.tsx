import React from 'react';
import { QueryClient, dehydrate } from 'react-query';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';

// hooks
import { useRouter } from 'next/router';
import { useUserProfileQuery, fetcherProfile } from '@api/story/user';

import { client } from '@api/client';
import { fetcherStories } from '@api/story/story';
import { API_ENDPOINTS } from '@constants/constant';

// components
import AppLayout from '@components/ui/layouts/AppLayout';
import ProfileMasthead from '@components/profile/detail/ProfileMasthead';
import UserStoriesTabList from '@components/profile/detail/UserStoriesTabList';
import UserStoriesLikesTabList from '@components/profile/detail/UserStoriesLikesTabList';
import ErrorBoundary from '@components/error/ErrorBoundary';

import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from 'next';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const id = ctx.query.id?.toString();

  const queryClient = new QueryClient();
  const cookie = ctx.req ? ctx.req.headers.cookie : '';
  if (client.defaults.headers) {
    (client.defaults.headers as any).Cookie = '';
    if (ctx.req && cookie) {
      (client.defaults.headers as any).Cookie = cookie;
    }
  }

  await Promise.all([
    queryClient.prefetchQuery(
      [API_ENDPOINTS.LOCAL.USER.ROOT, id],
      fetcherProfile,
    ),
    queryClient.prefetchInfiniteQuery(
      [API_ENDPOINTS.LOCAL.STORY.ROOT, { userId: Number(id) }],
      fetcherStories,
    ),
  ]);

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};

function ProfilePage({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const id = router.query.id?.toString();

  const { data } = useUserProfileQuery(id);

  const [value, setValue] = React.useState<'story' | 'likes'>('story');

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: 'story' | 'likes',
  ) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="main-container">
        <ProfileMasthead userInfo={data} />
        <div className="container-large">
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
                aria-label="story tabs"
              >
                <Tab label="나의 Story" wrapped value="story" />
                <Tab label="좋아한 Story" wrapped value="likes" />
              </Tabs>
            </Box>
            <TabPanel value="story">
              <UserStoriesTabList />
            </TabPanel>
            <TabPanel value="likes">
              <UserStoriesLikesTabList />
            </TabPanel>
          </TabContext>
        </div>
      </div>
      <style jsx>{`
        @media (min-width: 768px) {
          .container-large {
            max-width: 1680px;
          }
        }

        @media (min-width: 768px) {
          .container-large {
            padding-right: 32px;
            padding-left: 32px;
          }
        }

        @media (min-width: 1200px) {
          .container-large {
            padding-right: 72px;
            padding-left: 72px;
          }
        }
      `}</style>
    </>
  );
}

export default ProfilePage;

ProfilePage.Layout = AppLayout;

ProfilePage.ErrorBoundary = ErrorBoundary;
