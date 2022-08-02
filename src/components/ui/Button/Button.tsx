import React from 'react';
import { Button as MantineButton } from '@mantine/core';

// types
import type { ButtonProps as MantineButtonProps } from '@mantine/core';

interface ButtonProps extends Omit<MantineButtonProps<'button'>, 'sx'> {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text, ...resetProps }) => {
  return <MantineButton {...resetProps}>{text}</MantineButton>;
};

export default Button;
