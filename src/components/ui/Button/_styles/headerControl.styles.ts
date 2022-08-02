import { createStyles } from '@mantine/core';

interface HeaderControlStyles {
  hideOnMobile: boolean;
}

export default createStyles((theme, { hideOnMobile }: HeaderControlStyles) => ({
  control: {
    ...theme.fn.focusStyles(),
    width: 34,
    height: 34,
    borderRadius: theme.radius.md,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.gray[7],
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      display: hideOnMobile ? 'none' : undefined,
      position: 'absolute',
      right: 0,
    },
  },

  container: {
    [theme.fn.smallerThan('sm')]: {
      position: 'fixed',
      top: 14,
      right: theme.spacing.md,
    },
  },
}));
