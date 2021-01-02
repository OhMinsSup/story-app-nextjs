<script lang="ts">
  import remark from 'remark';
  import htmlPlugin from 'remark-html';
  import slug from 'remark-slug';
  import breaks from 'remark-breaks';

  import Typography from './Typography.svelte';
  import prismPlugin from '../../lib/remark/prismPlugin';
  import embedPlugin from '../../lib/remark/embedPlugin';
  import { filter, loadScript } from '../../lib/utils';

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
        console.log('render', htmlRender);
        // load twitter script if needed
        if (html.indexOf('class="twitter-tweet"') !== -1) {
          // if (window && (window as any).twttr) return;
          loadScript('https://platform.twitter.com/widgets.js');
        }

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
<div class="markdonw-render theme-dracula" contenteditable="true">
  {@html html}
</div>
