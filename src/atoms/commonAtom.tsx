import { COOKIE_KEY } from '@constants/constant';
import { getCookie, setCookie } from 'cookies-next';
import { atom } from 'jotai';

export type ThemeType = 'light' | 'dark';

// theme
export const themeAtom = atom<ThemeType>('light');

themeAtom.onMount = (setValue) => {
  const colorScheme = getCookie(COOKIE_KEY.THEME);
  if (colorScheme) {
    setValue(colorScheme as unknown as ThemeType);
  }
};

export const readWriteThemaAtom = atom(
  (get) => get(themeAtom),
  (get, set, newValue) => {
    let nextScheme;
    if (newValue) {
      nextScheme = newValue === 'dark' ? 'light' : 'dark';
    } else {
      const colorScheme = getCookie(COOKIE_KEY.THEME);
      nextScheme = colorScheme === 'dark' ? 'light' : 'dark';
    }

    setCookie(COOKIE_KEY.THEME, nextScheme, {
      sameSite: 'lax',
      domain: 'localhost',
      path: '/',
      maxAge: 2147483647,
    });
    set(themeAtom, nextScheme as ThemeType);
  },
);
