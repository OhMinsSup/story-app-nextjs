import { useStoriesQuery } from '@api/story/story';
import { StoriesCard } from '@components/ui/Card';
import { Header } from '@components/ui/Header';
import { Sidebar } from '@components/ui/Sidebar';
import { AppShell, SimpleGrid } from '@mantine/core';

// hooks
import { useMediaQuery } from '@mantine/hooks';

import React from 'react';

const IndexPage = () => {
  const smallScreen = useMediaQuery('(max-width: 768px)');
  const { data, fetchNextPage, hasNextPage } = useStoriesQuery();

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={smallScreen ? undefined : <Sidebar />}
      header={<Header />}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
        },
      })}
    >
      <SimpleGrid
        cols={4}
        spacing="lg"
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: 'md' },
          { maxWidth: 755, cols: 2, spacing: 'sm' },
          { maxWidth: 600, cols: 1, spacing: 'sm' },
        ]}
      >
        {data?.pages.map((item, i) => (
          <React.Fragment key={`grid-${i}`}>
            {item.list.map((story) => (
              <StoriesCard item={story} key={`stories-item-grid-${story.id}`} />
            ))}
          </React.Fragment>
        ))}
      </SimpleGrid>
    </AppShell>
  );
};

export default IndexPage;
