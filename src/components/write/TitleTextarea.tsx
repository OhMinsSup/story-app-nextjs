import TextareaAutosize from 'react-textarea-autosize';
import styled, { css } from 'styled-components';
import { mediaQuery } from '~/libs/styles/media';
import palette from '~/libs/styles/palette';

const style = css`
  display: block;
  padding: 0;
  font-size: 2.75rem;
  ${mediaQuery(767)} {
    font-size: 1.8rem;
  }
  width: 100%;
  resize: none;
  line-height: 1.5;
  outline: none;
  border: none;
  font-weight: bold;
  color: ${palette.gray9};
  &::placeholder {
    color: ${palette.gray5};
  }
`;

export const TitleTextareaForSSR = styled.textarea`
  ${style}
`;

const TitleTextarea = styled(TextareaAutosize)`
  ${style}
`;

export default TitleTextarea;
