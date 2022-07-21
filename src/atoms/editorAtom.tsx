import { atom, useAtom } from 'jotai';

interface EditorAtom {
  tags: boolean;
  upload: boolean;
}

// editor
export const editorAtom = atom<EditorAtom>({
  tags: false,
  upload: false,
});

export function useEditorAtom() {
  return useAtom(editorAtom);
}

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
