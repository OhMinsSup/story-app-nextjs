import React, { useState } from 'react';

// components
import Link from 'next/link';
import { MantineLogo } from '@components/ui/Logo';
import { HeaderControls } from '@components/ui/Header';
import { Header as MantineHeader, Group, Container } from '@mantine/core';

// hooks
import useStyles, { HEADER_HEIGHT } from './styles/Header.styles';

const links = [
  {
    link: '/search',
    label: '검색',
  },
  {
    link: '/tags',
    label: '태그',
  },
];

const Header = () => {
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link href={link.link} key={link.label}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: active === link.link,
        })}
      >
        {link.label}
      </a>
    </Link>
  ));

  return (
    <MantineHeader height={HEADER_HEIGHT} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={8} className={classes.links}>
          <MantineLogo />
          {items}
        </Group>
        <Group spacing={5} className={classes.links}>
          <HeaderControls />
        </Group>
      </Container>
    </MantineHeader>
  );
};

export default Header;
