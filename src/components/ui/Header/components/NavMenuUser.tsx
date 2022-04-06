import React from 'react';

// hooks
import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/core';
import { useUserHook } from '@store/hook';

// utils
import { getUserThumbnail } from '@utils/utils';

// icon
import { Dots } from 'tabler-icons-react';

// components
import { UnstyledButton, Group, Avatar, Text, Box } from '@mantine/core';

interface NavMenuUserProps {}

const NavMenuUser = (
  { ...others }: NavMenuUserProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const theme = useMantineTheme();
  const smallScreen = useMediaQuery('(max-width: 768px)');
  const { userInfo } = useUserHook();

  const url = getUserThumbnail(userInfo?.profile);

  const renderUserAvatar = () => {
    return <Avatar src={url} radius="xl" />;
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
              <Text size="xs" color="gray" weight={600}>
                {userInfo?.profile?.nickname}
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
