import React from 'react';

// components
import LeftArea from './LeftArea';
import RightArea from './RightArea';
import { Header as MantineHeader, Container } from '@mantine/core';

// hooks
import useStyles, { HEADER_HEIGHT } from '../_styles/header.styles';

const Header = () => {
  const { classes } = useStyles();

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <LeftArea />
        <RightArea />
      </Container>
    </MantineHeader>
  );
};

export default Header;
