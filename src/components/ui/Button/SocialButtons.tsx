import React from 'react';
import { Button, ButtonProps, Group } from '@mantine/core';
import GoogleIcon from './GoogleIcon';
import TwitterIcon from './TwitterIcon';

// icons
import { BrandGithub } from 'tabler-icons-react';

export function GoogleButton(props: ButtonProps<'button'>) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export function GithubButton(props: ButtonProps<'button'>) {
  return (
    <Button
      {...props}
      leftIcon={<BrandGithub />}
      sx={(theme) => ({
        backgroundColor:
          theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        color: '#fff',
        '&:hover': {
          backgroundColor:
            theme.colors.dark[theme.colorScheme === 'dark' ? 9 : 6],
        },
      })}
    />
  );
}
