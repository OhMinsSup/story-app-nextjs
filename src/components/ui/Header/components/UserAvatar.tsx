import React from 'react';

// hooks
import { useMantineTheme } from '@mantine/core';
import { useUserHook } from '@store/hook';

// utils
import { getUserThumbnail } from '@utils/utils';

// components
import { UnstyledButton, Group, Avatar } from '@mantine/core';

interface UserAvatarProps {}

const UserAvatar = (
  { ...others }: UserAvatarProps,
  ref: React.ForwardedRef<HTMLButtonElement>,
) => {
  const theme = useMantineTheme();
  const { userInfo } = useUserHook();

  const url = getUserThumbnail(userInfo?.profile);

  return (
    <UnstyledButton
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
    </UnstyledButton>
  );
};

export default React.forwardRef<HTMLButtonElement, UserAvatarProps>(UserAvatar);
