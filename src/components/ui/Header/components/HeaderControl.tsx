import React from 'react';
import { UnstyledButton } from '@mantine/core';
import Link from 'next/link';

// hooks
import useStyles from '../styles/HeaderControl.styles';

interface HeaderControlProps extends React.ComponentPropsWithoutRef<'button'> {
  link?: string;
  variant?: 'default';
  hideOnMobile?: boolean;
}

function HeaderControl({
  link,
  variant = 'default',
  hideOnMobile = false,
  ...others
}: HeaderControlProps) {
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

export default HeaderControl;
