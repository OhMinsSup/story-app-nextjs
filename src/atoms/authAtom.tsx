import { atom } from 'jotai';

// auth
export const authAtom = atom<boolean>(false);

export const themeAtom = atom<'light' | 'dark'>('light');
