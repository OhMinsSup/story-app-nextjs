import React from 'react';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
// icon
import { Dots } from 'tabler-icons-react';

// components
import { UnstyledButton, Group, Avatar, Text, Box } from '@mantine/core';

import type { UnstyledButtonProps } from '@mantine/core';

interface NavMenuUserProps extends UnstyledButtonProps {}

const NavMenuUser = (
  { ...others }: NavMenuUserProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery('(max-width: 768px)');

  const renderUserAvatar = () => {
    return (
      <Avatar
        src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
        radius="xl"
      />
    );
  };

  return (
    <UnstyledButton
      ref={ref}
      sx={{
        display: 'block',
        width: '100%',
        ...(!smallScreen && {
          padding: theme.spacing.sm,
        }),

        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      }}
      {...others}
    >
      <Group align="center" className="md:p-0 p-1">
        {smallScreen ? (
          renderUserAvatar()
        ) : (
          <>
            {renderUserAvatar()}
            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight={600}>
                Amy
              </Text>
              <Text color="gray" size="xs">
                @Lalosses
              </Text>
            </Box>

            <Dots size={18} />
          </>
        )}
      </Group>
    </UnstyledButton>
  );
};

export default React.forwardRef<HTMLButtonElement, NavMenuUserProps>(
  NavMenuUser,
);
