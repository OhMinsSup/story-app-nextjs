import React from 'react';
import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';

// hooks
import useStyles from '../_styles/headerControl.styles';

interface UniversalButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  link?: string;
  variant?: 'default';
  hideOnMobile?: boolean;
}

function UniversalButton({
  link,
  variant = 'default',
  hideOnMobile = false,
  ...others
}: UniversalButtonProps) {
  const { classes, cx } = useStyles({ hideOnMobile });

  if (link) {
    return (
      <Link href={link}>
        <a
          className={cx(classes.control, variant ?? classes[variant])}
          {...(others as any)}
        >
          {others.children}
        </a>
      </Link>
    );
  }

  return (
    <UnstyledButton
      className={cx(classes.control, variant ?? classes[variant])}
      {...others}
    />
  );
}

export default UniversalButton;
