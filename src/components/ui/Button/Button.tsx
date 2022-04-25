import React from 'react';
import { Button as MantineButton } from '@mantine/core';

// types
import type { ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends Omit<MantineButtonProps<'button'>, 'sx'> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...resetProps }) => {
  return (
    <MantineButton
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark' ? theme.colors.dark[9] : 'white',

        color: theme.colorScheme === 'dark' ? 'white' : theme.colors.dark[9],
        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.primaryColor
              : theme.colors.gray[1],
        },
      })}
      {...resetProps}
    >
      {text}
    </MantineButton>
  );
};

export default Button;
