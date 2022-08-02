import React from 'react';

// compoentns
import Link from 'next/link';
import LogoImage from './components/LogoImage';

// hooks
import useStyles from './styles/Logo.styles';

function MantineLogo() {
  const { classes } = useStyles();

  return (
    <Link href="/">
      <a className={classes.logo} aria-label="Mantine">
        <LogoImage className={classes.image} />
      </a>
    </Link>
  );
}

export default MantineLogo;
