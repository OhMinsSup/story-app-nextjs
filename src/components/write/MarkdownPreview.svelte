<script lang="ts">
  import MarkdownRender from '../common/MarkdownRender.svelte';

  export let title = '';
  export let markdown = '';
</script>

<div class="markdown-preview" id="preview">
  <h1>{title}</h1>
  <MarkdownRender markdown="{markdown}" />
</div>
