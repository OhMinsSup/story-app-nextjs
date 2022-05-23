import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  logo: {
    ...theme.fn.focusStyles(),
    textDecoration: 'none',
    userSelect: 'none',
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    paddingLeft: '5px',
    paddingRight: '5px',
    lineHeight: '15px',
  },

  image: {
    height: 30,
  },
}));
