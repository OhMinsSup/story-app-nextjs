import { createSlice } from '@reduxjs/toolkit';
import {
  changeTitle,
  changeMarkDown,
  changeTags,
  clearEditor,
  prepareEdit,
  setInitialBody,
  setInitialHead,
} from './actions/write.action';

export interface WriteState {
  markdown: string;
  title: string;
  html: string;
  tags: string[];
  publish: boolean; // publish screen visibility
  textBody: string;
  defaultDescription: string;
  description: string;
  isPrivate: boolean;
  urlSlug: string;
  thumbnail: string | null;
  postId: null | string;
  isTemp: boolean;
  initialTitle: string;
  initialBody: string;
}

export const initialState: WriteState = {
  markdown: '',
  title: '',
  html: '',
  tags: [],
  publish: false,
  textBody: '',
  defaultDescription: '',
  description: '',
  isPrivate: false,
  urlSlug: '',
  thumbnail: null,
  postId: null,
  isTemp: false,
  initialTitle: '',
  initialBody: '',
};

const write = createSlice({
  name: 'write',
  initialState,
  reducers: {
    changeTitle,
    changeMarkDown,
    changeTags,
    clearEditor,
    prepareEdit,
    setInitialBody,
    setInitialHead,
  },
});

export default write;
