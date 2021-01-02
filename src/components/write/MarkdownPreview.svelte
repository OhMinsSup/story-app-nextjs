<style lang="scss">
  @import '../../styles/variables.scss';

  .markdown-preview {
    word-break: break-word;
    padding: 3rem;
    flex: 1;
    overflow-y: auto;
    color: gray9;

    h1 {
      font-size: 2.5em;
      margin-bottom: 4rem;
      font-weight: 800;
    }
  }
</style>

<script lang="ts">
  import MarkdownRender from '../common/MarkdownRender.svelte';

  export let title = '';
  export let markdown = '';
</script>

<div class="markdown-preview" id="preview">
  <h1>{title}</h1>
  <MarkdownRender markdown="{markdown}" />
</div>
