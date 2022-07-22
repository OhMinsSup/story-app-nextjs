import { atom, useAtom } from 'jotai';

// image

interface ImageAtom {
  idx: number;
  name: string;
  contentUrl: string;
}

export const imageAtom = atom<ImageAtom | null>(null);

export function useImageAtom() {
  return useAtom(imageAtom);
}
