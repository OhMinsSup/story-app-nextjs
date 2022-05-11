import React from 'react';
import { Button, ButtonProps } from '@mantine/core';

// icons
import { BrandGithub } from 'tabler-icons-react';

const GithubButton = (props: ButtonProps<'button'>) => {
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
};

export default GithubButton;
