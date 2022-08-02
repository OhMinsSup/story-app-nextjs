import React from 'react';
import { Button, ButtonProps } from '@mantine/core';
import { GoogleIcon } from '@components/ui/Icon';

function GoogleButton(props: ButtonProps) {
  return (
    <Button
      leftIcon={<GoogleIcon />}
      variant="default"
      color="gray"
      {...props}
    />
  );
}

export default GoogleButton;
