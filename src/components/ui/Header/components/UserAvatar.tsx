import React from 'react';

// hooks
import { useMantineTheme } from '@mantine/core';
import { useUserHook } from '@store/hook';

// utils
import { getUserThumbnail } from '@utils/utils';

// components
import { Box, Group, Avatar } from '@mantine/core';

interface UserAvatarProps {}

const UserAvatar = (
  { ...others }: UserAvatarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const theme = useMantineTheme();
  const { userInfo } = useUserHook();

  const url = getUserThumbnail(userInfo?.profile);

  return (
    <>
      <Box
        ref={ref}
        sx={{
          display: 'block',
          width: '100%',
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        }}
        {...others}
      >
        <Group align="center" className="md:p-0 p-1">
          <Avatar src={url} radius="xl" />
        </Group>
      </Box>
    </>
  );
};

export default React.forwardRef<HTMLDivElement, UserAvatarProps>(UserAvatar);
