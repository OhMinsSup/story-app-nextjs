import React, { Component } from 'react';
import styled from 'styled-components';
import type { EditorFromTextArea } from 'codemirror';
import { useSpring, animated } from 'react-spring';
import 'codemirror/lib/codemirror.css';

import TitleTextarea, { TitleTextareaForSSR } from './TitleTextarea';

import media, { mediaQuery } from '~/libs/styles/media';
import palette from '~/libs/styles/palette';
import zIndexes from '~/libs/styles/zIndexes';
import detectIOS from '~/libs/detectIOS';

function WriterHead({
  hide,
  children,
}: {
  hide: boolean;
  children: React.ReactNode;
}) {
  const screenHeight =
    (typeof window !== 'undefined' && window.screen.height) || 508;

  const springStyle = useSpring({
    maxHeight: hide ? 0 : screenHeight * 0.5,
    opacity: hide ? 0 : 1,
    config: {
      duration: 300,
    },
  });
  return (
    <animated.div style={springStyle}>
      <PaddingWrapper>{children}</PaddingWrapper>
    </animated.div>
  );
}

interface WriteMarkdownEditorProps {
  isServer: boolean;
}
interface WriteMarkdownEditorState {
  addLink: {
    top: number | null;
    bottom: number | null;
    left: number;
    visible: boolean;
    stickToRight: boolean;
  };
  askChangeEditor: boolean;
  clientWidth: number;
  hideUpper: boolean;
  appleCursorPos: number;
}

export class WriteMarkdownEditor extends Component<
  WriteMarkdownEditorProps,
  WriteMarkdownEditorState
> {
  private block = React.createRef<HTMLDivElement>();
  private toolbarElement = React.createRef<HTMLDivElement>();
  private editorElement = React.createRef<HTMLTextAreaElement>();
  private appleEditorElement = React.createRef<HTMLTextAreaElement>();

  private toolbarTop = 0;

  private codemirror: EditorFromTextArea | null = null;
  private ignore = false;
  private isIOS = false;

  constructor(props: WriteMarkdownEditorProps) {
    super(props);

    this.state = {
      addLink: {
        top: 0,
        bottom: 0,
        left: 0,
        visible: false,
        stickToRight: false,
      },
      askChangeEditor: false,
      clientWidth: 0,
      hideUpper: false,
      appleCursorPos: 0,
    };

    this.isIOS = detectIOS(props.isServer);
    console.log(this.isIOS);
  }

  initialize = () => {
    if (!this.editorElement.current) return;
    const CodeMirror = require('codemirror');
    require('codemirror/mode/markdown/markdown');
    require('codemirror/mode/javascript/javascript');
    require('codemirror/mode/jsx/jsx');
    require('codemirror/addon/display/placeholder');
    this.codemirror = CodeMirror.fromTextArea(this.editorElement.current, {
      mode: 'markdown',
      theme: 'one-light',
      placeholder: '당신의 이야기를 적어보세요...',
      lineWrapping: true,
    });
  };

  componentDidMount() {
    this.initialize();
  }

  render() {
    return (
      <MarkdownEditorBlock ref={this.block} data-testid="codemirror">
        <div className="wrapper">
          <WriterHead hide={this.state.hideUpper}>
            {this.props.isServer ? (
              <TitleTextareaForSSR placeholder="제목을 입력하세요." rows={1} />
            ) : (
              <TitleTextarea placeholder="제목을 입력하세요." />
            )}
            <HorizontalBar />
          </WriterHead>
          <MarkdownWrapper>
            <textarea ref={this.editorElement} style={{ display: 'none' }} />
            {this.isIOS && <AppleTextarea />}
          </MarkdownWrapper>
        </div>

        <FooterWrapper style={{ width: '50%' }}>Footer</FooterWrapper>
      </MarkdownEditorBlock>
    );
  }
}

export default WriteMarkdownEditor;

const MarkdownEditorBlock = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  &::-webkit-scrollbar {
    border-radius: 3px;
    width: 6px;
    &:hover {
      width: 16px;
    }
    background: ${palette.gray1};
  }
  &::-webkit-scrollbar-thumb {
    z-index: 100;
    background: ${palette.gray9};
    /* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
  }
  & > .wrapper {
    min-height: 0;
    padding-bottom: 4rem;
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .CodeMirror-lines {
    padding: 4px 0; /* Vertical padding around content */
    padding-bottom: 3rem;
  }
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    padding: 0 3rem; /* Horizontal padding of content */
    ${mediaQuery(767)} {
      padding: 0 1rem;
    }
  }
  .CodeMirror {
    min-height: 0;
    flex: 1;
    font-size: 1.125rem;
    line-height: 1.5;
    color: ${palette.gray8};
    font-family: 'Fira Mono', monospace;
    /* font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', */
    .cm-header {
      line-height: 1.5;
      color: ${palette.gray9};
    }
    .cm-header-1 {
      font-size: 2.5rem;
    }
    .cm-header-2 {
      font-size: 2rem;
    }
    .cm-header-3 {
      font-size: 1.5rem;
    }
    .cm-header-4,
    .cm-header-5,
    .cm-header-6 {
      font-size: 1.3125rem;
    }
    .cm-strong,
    .cm-em {
      color: ${palette.gray9};
    }
    .CodeMirror-placeholder {
      color: ${palette.gray5};
      font-style: italic;
    }
    ${media.custom(767)} {
      font-size: 0.875rem;
      .cm-header-1 {
        font-size: 2rem;
      }
      .cm-header-2 {
        font-size: 1.5rem;
      }
      .cm-header-3 {
        font-size: 1.15rem;
      }
      .cm-header-4,
      .cm-header-5,
      .cm-header-6 {
        font-size: 1rem;
      }
    }
  }
`;

const HorizontalBar = styled.div`
  background: ${palette.gray7};
  height: 6px;
  width: 4rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  ${mediaQuery(767)} {
    margin-top: 1rem;
    margin-bottom: 0.66rem;
  }
  border-radius: 1px;
`;

const PaddingWrapper = styled.div`
  padding-top: 2rem;
  padding-left: 3rem;
  padding-right: 3rem;
  ${mediaQuery(767)} {
    padding: 1rem;
  }
`;

const MarkdownWrapper = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
`;

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: ${zIndexes.WriteFooter};
`;

const AppleTextarea = styled.textarea`
  flex: 1;
  outline: none;
  font-size: 1.125rem;
  padding-left: 3rem;
  padding-right: 3rem;
  line-height: 1.5;
  padding-bottom: 3rem;
  color: ${palette.gray8};
  ${media.custom(767)} {
    font-size: 0.875rem;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-bottom: 1rem;
  }
`;
