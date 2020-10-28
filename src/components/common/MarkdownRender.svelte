<style lang="scss" global>
  @import '../../styles/variables.scss';

  .markdonw-render {
    & > {
      pre {
        background: #313440;
      }

      code[class*='language-'],
      pre[class*='language-'] {
        color: #e0e6f1;
        background: none;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        -moz-tab-size: 4;
        -o-tab-size: 4;
        tab-size: 4;
        -webkit-hyphens: none;
        -moz-hyphens: none;
        -ms-hyphens: none;
        hyphens: none;
      }
      pre[class*='language-']::-moz-selection,
      pre[class*='language-'] ::-moz-selection,
      code[class*='language-']::-moz-selection,
      code[class*='language-'] ::-moz-selection {
        text-shadow: none;
        background: #383e49;
      }
      pre[class*='language-']::selection,
      pre[class*='language-'] ::selection,
      code[class*='language-']::selection,
      code[class*='language-'] ::selection {
        text-shadow: none;
        background: #9aa2b1;
      }
      @media print {
        code[class*='language-'],
        pre[class*='language-'] {
          text-shadow: none;
        }
      }
      /* Code blocks */
      pre[class*='language-'] {
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
      }
      :not(pre) > code[class*='language-'],
      pre[class*='language-'] {
        background: #282c34;
      }
      /* Inline code */
      :not(pre) > code[class*='language-'] {
        padding: 0.1em;
        border-radius: 0.3em;
        white-space: normal;
      }
      .token.comment,
      .token.prolog,
      .token.doctype,
      .token.cdata {
        color: #5c6370;
      }
      .token.punctuation {
        color: #abb2bf;
      }
      .token.selector,
      .token.tag {
        color: #e06c75;
      }
      .token.property,
      .token.boolean,
      .token.number,
      .token.constant,
      .token.symbol,
      .token.attr-name,
      .token.deleted {
        color: #d19a66;
      }
      .token.string,
      .token.char,
      .token.attr-value,
      .token.builtin,
      .token.inserted {
        color: #98c379;
      }
      .token.operator,
      .token.entity,
      .token.url,
      .language-css .token.string,
      .style .token.string {
        color: #56b6c2;
      }
      .token.atrule,
      .token.keyword {
        color: #c678dd;
      }
      .token.function {
        color: #61afef;
      }
      .token.regex,
      .token.important,
      .token.variable {
        color: #c678dd;
      }
      .token.important,
      .token.bold {
        font-weight: bold;
      }
      .token.italic {
        font-style: italic;
      }
      .token.entity {
        cursor: help;
      }
      pre.line-numbers {
        position: relative;
        padding-left: 3.8em;
        counter-reset: linenumber;
      }
      pre.line-numbers > code {
        position: relative;
      }
      .line-numbers .line-numbers-rows {
        position: absolute;
        pointer-events: none;
        top: 0;
        font-size: 100%;
        left: -3.8em;
        width: 3em; /* works for line-numbers below 1000 lines */
        letter-spacing: -1px;
        border-right: 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .line-numbers-rows > span {
        pointer-events: none;
        display: block;
        counter-increment: linenumber;
      }
      .line-numbers-rows > span:before {
        content: counter(linenumber);
        color: #5c6370;
        display: block;
        padding-right: 0.8em;
        text-align: right;
      }
    }
    pre {
      font-family: 'Fira Mono', source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
      font-size: 1rem;
      padding: 1rem;
      border-radius: 4px;
      line-height: 1.5;
      overflow-x: auto;
      letter-spacing: 0px;
    }
    img {
      max-width: 100%;
      height: auto;
      display: block;
      margin-top: 1.5rem;
      margin-bottom: 1.5rem;
    }
    iframe {
      width: 768px;
      height: 430px;
      max-width: 100%;
      background: black;
      display: block;
      margin: auto;
      border: none;
      border-radius: 4px;
      overflow: hidden;
    }
    .twitter-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      border-left: none;
      background: none;
      padding: none;
    }
    table {
      min-width: 40%;
      max-width: 100%;
      border: 1px solid gray7;
      border-collapse: collapse;
      font-size: 0.875rem;
      thead > tr > th {
        /* text-align: left; */
        border-bottom: 4px solid gray7;
      }
      th,
      td {
        word-break: break-word;
        padding: 0.5rem;
      }
      td + td,
      th + th {
        border-left: 1px solid gray7;
      }
      tr:nth-child(even) {
        background: gray1;
      }
      tr:nth-child(odd) {
        background: white;
      }
    }
    .katex-mathml {
      display: none;
    }
  }
</style>

<script lang="ts">
  import remark from 'remark';
  import htmlPlugin from 'remark-html';
  import slug from 'remark-slug';
  import breaks from 'remark-breaks';
  import { onMount } from 'svelte';

  import Typography from './Typography.svelte';
  import prismPlugin from '../../lib/remark/prismPlugin';
  import embedPlugin from '../../lib/remark/embedPlugin';
  import { filter } from '../../lib/utils';

  export let markdown = '';
  export let editing = false;

  let html =
    typeof window !== 'undefined'
      ? filter(
          remark()
            .use(breaks)
            .use(prismPlugin)
            .use(htmlPlugin, {
              sanitize: true,
            })
            .use(embedPlugin)
            .use(slug)
            .processSync(markdown)
            .toString()
        )
      : '';

  $: {
    remark()
      .use(breaks)
      .use(prismPlugin)
      .use(htmlPlugin)
      .use(embedPlugin)
      .use(slug)
      .process(markdown, (err: any, file: any) => {
        if (err) {
          console.error(err);
          return;
        }

        const htmlRender = String(file);
        html = editing ? htmlRender : filter(htmlRender);
      });
  }
</script>

<svelte:head>
  {#if /\$(.*)\$/.test(markdown)}
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/katex@0.11.1/dist/katex.min.css"
      integrity="sha384-zB1R0rpPzHqg7Kpt0Aljp8JPLqbXI3bhnPWROx27a9N0Ll6ZP/+DiW/UqRcLbRjq"
      crossOrigin="anonymous"
    />
  {/if}
</svelte:head>
<Typography />
<div class="markdonw-render" contenteditable="true">
  {@html html}
</div>
