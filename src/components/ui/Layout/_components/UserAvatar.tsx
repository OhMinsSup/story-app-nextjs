import React, { useMemo } from 'react';

// hooks
import { useMantineTheme } from '@mantine/core';

// components
import { Box, Group, Avatar } from '@mantine/core';

// types
import type { MeResp } from '@api/schema/resp';

interface UserAvatarProps {
  userInfo?: MeResp;
}

const UserAvatar = (
  { userInfo, ...others }: UserAvatarProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) => {
  const theme = useMantineTheme();
  const resource = useMemo(
    () => userInfo?.profileUrl ?? null,
    [userInfo?.profileUrl],
  );

  return (
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
        <Avatar src={resource} radius="xl" />
      </Group>
    </Box>
  );
};

export default React.forwardRef<HTMLDivElement, UserAvatarProps>(UserAvatar);
