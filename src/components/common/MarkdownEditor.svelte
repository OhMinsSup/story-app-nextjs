<style lang="scss">
  @import '../../styles/variables.scss';

  :global(.CodeMirror) {
    min-height: 0;
    flex: 1;
    font-size: 1.125rem;
    line-height: 1.5;
    color: $gray8 !important;
    font-family: 'Fira Mono', monospace !important;
  }

  :global(.CodeMirror-lines) {
    padding-bottom: 3rem !important;
  }

  :global(pre.CodeMirror-line) {
    padding: 0 3rem !important;
  }

  :global(pre.CodeMirror-line-like) {
    padding: 0 3rem !important;
  }

  :global(.CodeMirror-placeholder) {
    color: $gray5 !important;
    font-style: italic !important;
  }

  :global(.cm-header) {
    line-height: 1.5 !important;
    color: $gray9 !important;
  }

  :global(.cm-header-1) {
    font-size: 2.5rem !important;
  }

  :global(.cm-header-2) {
    font-size: 2rem !important;
  }

  :global(.cm-header-3) {
    font-size: 1.5rem !important;
  }

  :global(.cm-header-4, .cm-header-5, .cm-header-6) {
    font-size: 1.3125rem !important;
  }

  :global(.cm-strong, .cm-em) {
    color: $gray9 !important;
  }

  .markdown-editor-codemirror {
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
      background: gray1;
    }
    &::-webkit-scrollbar-thumb {
      z-index: 100;
      background: gray9;
      /* -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75); */
    }
    & > .wrapper {
      min-height: 0;
      padding-bottom: 4rem;
      flex: 1;
      display: flex;
      flex-direction: column;

      .write-header {
        padding-top: 2rem;
        padding-left: 3rem;
        padding-right: 3rem;
        .horizontal-bar {
          background: $gray7;
          border-radius: 1px;
          height: 6px;
          width: 4rem;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
      }

      .markdown-wrapper {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }

      .footer-wrapper {
        position: fixed;
        bottom: 0;
        width: 100%;
        z-index: 10;
      }
    }
  }
</style>

<script context="module" lang="ts">
  import { is_browser } from '../../lib/utils';

  let codemirror_promise: any;
  let CodeMirror: any;

  if (is_browser) {
    codemirror_promise = import('../../lib/codemirror');
    codemirror_promise.then((mod: any) => {
      CodeMirror = mod.default;
    });
  }
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import type { EditorFromTextArea } from 'codemirror';

  import write from '../../store/write';

  import TitleTextarea from '../write/TitleTextarea.svelte';
  import Toolbar from '../write/Toolbar.svelte';
  import AddLink from '../write/AddLink.svelte';

  let blockRef: HTMLDivElement;
  let toolbarRef: HTMLDivElement;
  let textareaRef: HTMLTextAreaElement;
  let triggerEl: HTMLDivElement;

  let editor: EditorFromTextArea;
  // local State
  let hideUpper: boolean = false;
  let clientWidth: number = 0;
  let toolbarTop: number = 0;

  let addLink = {
    top: 0,
    bottom: 0,
    left: 0,
    visible: false,
    stickToRight: false,
  };

  const stickToBottomIfNeeded = () => {
    if (!blockRef) return;
    const { scrollHeight, scrollTop, clientHeight } = blockRef;
    const scrollBottom = scrollHeight - scrollTop - clientHeight;
    if (scrollBottom < 192) {
      blockRef.scrollTo(0, scrollHeight);
    }
  };

  const handleResize = () => {
    if (blockRef) {
      clientWidth = blockRef.clientWidth;
    }
  };

  const addImageToEditor = (image: string) => {
    if (!editor) return;
    editor.getDoc().replaceSelection(`![](${encodeURI(image)})`);
  };

  const removeHeading = (text: string) => {
    return text.replace(/#{1,6} /, '');
  };

  const handleOpenAddLink = () => {
    if (!editor) return;
    const doc = editor.getDoc();
    const cursor = doc.getCursor();
    const cursorPos = editor.cursorCoords(cursor);
    if (!blockRef) return;
    const stickToRight = cursorPos.left > blockRef.clientWidth - 341;
    const calculatedTop = blockRef.scrollTop + cursorPos.top + editor.defaultTextHeight() / 2 + 1;

    const isAtBottom = calculatedTop + 173 > blockRef.clientHeight;
    const pos = isAtBottom ? { top: null, bottom: 53 } : { top: calculatedTop, bottom: null };

    addLink = {
      ...addLink,
      visible: true,
      left: cursorPos.left,
      stickToRight,
      ...pos,
    };
  };

  const handleConfirmAddLink = (event: CustomEvent<{ link: string }>) => {
    const { link } = event.detail;

    addLink = {
      ...addLink,
      visible: false,
    };
    if (!editor) return;
    const doc = editor.getDoc();
    const selection = doc.getSelection();
    const cursor = doc.getCursor('end');
    editor.focus();
    if (selection.length === 0) {
      doc.replaceSelection(`[링크텍스트](${link})`);
      doc.setSelection(
        {
          line: cursor.line,
          ch: cursor.ch + 1,
        },
        {
          line: cursor.line,
          ch: cursor.ch + 6,
        }
      );
      return;
    }
    doc.replaceSelection(`[${selection}](${link})`);
    doc.setCursor({
      line: cursor.line,
      ch: cursor.ch + link.length + 4,
    });
  };

  async function mountEditor() {
    if (!textareaRef || !CodeMirror) return;

    const cm = CodeMirror.fromTextArea(textareaRef, {
      mode: 'markdown',
      theme: 'one-light',
      placeholder: '당신의 이야기를 적어보세요...',
      lineWrapping: true,
    });

    editor = cm;
    editor.setValue($write.markdown);

    editor.on('change', (cm) => {
      write.changeMarkDown(cm.getValue());
      stickToBottomIfNeeded();
      const doc = cm.getDoc();

      // scroll to bottom when editing last 5
      const { line } = doc.getCursor();
      const last = doc.lastLine();
      if (last - line < 5) {
        const preview = document.getElementById('preview');
        if (!preview) return;
        preview.scrollTop = preview.scrollHeight;
      }
    });

    editor.on('scroll', (cm) => {
      const info = cm.getScrollInfo();

      if (info.top > 0 && info.height > window.screen.height) {
        hideUpper = true;
      } else {
        hideUpper = false;
      }
    });

    editor.focus();
  }

  // your script goes here
  onMount(() => {
    (async () => {
      if (!CodeMirror) {
        let mod = await codemirror_promise;
        CodeMirror = mod.default;
      } else {
        CodeMirror = CodeMirror;
      }

      await mountEditor();
    })();

    setTimeout(() => {
      if (toolbarRef) {
        toolbarTop = toolbarRef.getBoundingClientRect().top;
      }
    });

    if (blockRef) {
      clientWidth = blockRef.clientWidth;
    }

    window.addEventListener('resize', handleResize);

    return () => {
      editor.toTextArea();
      window.removeEventListener('resize', handleResize);
    };
  });

  const onChangeTitle = (e: KeyboardEvent) => {
    const { value } = e.target as any;
    write.changeTitle(value);
  };

  const onClickToolbar = (e: any) => {
    const { mode } = e.detail;

    const codemirrorEditor = editor;
    if (!codemirrorEditor) return;

    const doc = codemirrorEditor.getDoc();

    const cursor = doc.getCursor();
    const selection = {
      start: doc.getCursor('start'),
      end: doc.getCursor('end'),
    };

    const line = doc.getLine(cursor.line);

    const selectWholeLine = () => {
      doc.setSelection(
        {
          line: cursor.line,
          ch: 0,
        },
        {
          line: cursor.line,
          ch: line.length,
        }
      );
    };

    const handlers: {
      [key: string]: Function;
    } = {
      ...[1, 2, 3, 4]
        .map((number) => () => {
          // create handler function
          const characters = '#'.repeat(number);
          const plain = removeHeading(line);
          selectWholeLine();
          doc.replaceSelection(`${characters} ${plain}`);
        })
        .reduce((headingHandlers, handler, index) => {
          // reduce into handlers object
          return Object.assign(headingHandlers, {
            [`heading${index + 1}`]: handler,
          });
        }, {}),
      bold: () => {
        const selected = doc.getSelection();
        if (selected === '텍스트') {
          const isBold = /\*\*(.*)\*\*/.test(
            doc.getRange(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch + 2 }
            )
          );

          if (isBold) {
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch + 2 }
            );
            doc.replaceSelection('텍스트');
            doc.setSelection(
              { line: selection.start.line, ch: selection.start.ch - 2 },
              { line: selection.end.line, ch: selection.end.ch - 2 }
            );
            return;
          }
        }
        if (/\*\*(.*)\*\*/.test(selected)) {
          // matches **string**
          doc.replaceSelection(selected.replace(/\*\*/g, ''));
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 4 }
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`**${selected}**`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 }
          );
          return;
        }
        doc.replaceSelection('**텍스트**');
        doc.setSelection(
          {
            line: cursor.line,
            ch: cursor.ch + 2,
          },
          {
            line: cursor.line,
            ch: cursor.ch + 5,
          }
        );
      },
      italic: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection(`_텍스트_`);
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 1,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 4,
            }
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            },
            {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            }
          );
          if (/_(.*)_/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              {
                line: selection.start.line,
                ch: selection.start.ch - 1,
              },
              {
                line: selection.end.line,
                ch: selection.end.ch + 1,
              }
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 1,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 1,
            };
          }
        }

        if (/_(.*)_/.test(selected)) {
          const plain = selected
            .replace(/^_/, '') // remove starting _
            .replace(/_$/, ''); // remove ending _
          doc.replaceSelection(plain);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 2 }
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`_${selected}_`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 2 }
          );
        }
      },
      strike: () => {
        let selected = doc.getSelection();

        if (selected.length === 0) {
          doc.replaceSelection(`~~텍스트~~`);
          doc.setSelection(
            {
              line: cursor.line,
              ch: cursor.ch + 2,
            },
            {
              line: cursor.line,
              ch: cursor.ch + 5,
            }
          );
          return;
        }

        if (selected === '텍스트') {
          const selectLeftAndRight = doc.getRange(
            {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            },
            {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            }
          );
          if (/~~(.*)~~/.test(selectLeftAndRight)) {
            selected = selectLeftAndRight;
            doc.setSelection(
              {
                line: selection.start.line,
                ch: selection.start.ch - 2,
              },
              {
                line: selection.end.line,
                ch: selection.end.ch + 2,
              }
            );
            selection.start = {
              line: selection.start.line,
              ch: selection.start.ch - 2,
            };
            selection.end = {
              line: selection.end.line,
              ch: selection.end.ch + 2,
            };
          }
        }

        if (/~~(.*)~~/.test(selected)) {
          const plain = selected
            .replace(/^~~/, '') // remove starting ~~
            .replace(/~~$/, ''); // remove ending ~~
          doc.replaceSelection(plain);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch - 4 }
          );
          return;
        }
        if (selected.length > 0) {
          doc.replaceSelection(`~~${selected}~~`);
          doc.setSelection(
            {
              line: selection.start.line,
              ch: selection.start.ch,
            },
            { line: selection.end.line, ch: selection.end.ch + 4 }
          );
        }
      },
      blockquote: () => {
        const matches = /^> /.test(line);
        doc.setSelection({ line: cursor.line, ch: 0 }, { line: cursor.line, ch: line.length });
        if (matches) {
          doc.replaceSelection(line.replace(/^> /, ''));
          doc.setCursor({
            line: cursor.line,
            ch: cursor.ch - 2,
          });
        } else {
          doc.replaceSelection(`> ${line}`);
          doc.setCursor({
            line: cursor.line,
            ch: cursor.ch + 2,
          });
        }
      },
      link: () => handleOpenAddLink(),
      image: () => {},
      codeblock: () => {
        const selected = doc.getSelection();
        if (selected.length === 0) {
          doc.replaceSelection('```\n코드를 입력하세요\n```');
          doc.setSelection(
            {
              line: cursor.line + 1,
              ch: 0,
            },
            {
              line: cursor.line + 1,
              ch: 9,
            }
          );
          return;
        }
        doc.replaceSelection(`\`\`\`
${selected}
\`\`\``);
      },
    };

    const handler = handlers[mode];
    if (!handler) return;

    handler();
    codemirrorEditor.focus();
  };
</script>

<div class="markdown-editor-codemirror" bind:this="{blockRef}">
  <div class="wrapper">
    <div class="write-header">
      <TitleTextarea title="{$write.title}" on:keypress="{onChangeTitle}" />
      <div class="horizontal-bar">
        <!-- horizontalBar -->
      </div>
      <slot name="tag-input">
        <!-- tag input fallback -->
      </slot>
    </div>
    <Toolbar innerRef="{toolbarRef}" on:clickToolbar="{onClickToolbar}" />
    <div class="markdown-wrapper">
      {#if addLink.visible}
        <AddLink
          defaultValue=""
          left="{addLink.left}"
          top="{addLink.top}"
          bottom="{addLink.bottom}"
          stickToRight="{addLink.stickToRight}"
          on:confirmAddLink="{handleConfirmAddLink}"
        />
      {/if}
      <textarea bind:this="{textareaRef}" style="display:none;"></textarea>
    </div>
    <div class="footer-wrapper">
      footer
      <!-- footer wrapper -->
    </div>
  </div>
</div>
