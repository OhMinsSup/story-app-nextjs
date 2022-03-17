import React from 'react';
import { Header as MantineHeader, Group, Box } from '@mantine/core';

const Header = () => {
  return (
    <MantineHeader height={60} p="xs">
      <Box
        className="pt-1"
        sx={(theme) => ({
          paddingLeft: theme.spacing.xs,
          paddingRight: theme.spacing.xs,
          paddingBottom: theme.spacing.xs,
        })}
      >
        <Group position="apart">
          {/* <Logo colorScheme={colorScheme} /> */}
          Story
        </Group>
      </Box>
    </MantineHeader>
  );
};

export default Header;
