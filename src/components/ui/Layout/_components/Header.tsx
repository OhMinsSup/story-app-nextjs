import React from 'react';

// components
import LeftArea from './LeftArea';
import { MantineLogo } from '@components/ui/Logo';
import { HeaderControls } from '@components/ui/Header';
import { Header as MantineHeader, Container } from '@mantine/core';

// hooks
import useStyles, { HEADER_HEIGHT } from '../_styles/header.styles';

const Header = () => {
  const { classes } = useStyles();

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <MantineLogo />
        <HeaderControls />
      </Container>
    </MantineHeader>
  );
};

export default Header;
