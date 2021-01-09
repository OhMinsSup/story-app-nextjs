<script lang="ts">
  import MarkdownEditorContainer from '../../containers/write/MarkdownEditorContainer.svelte';
  import MarkdownPreviewContainer from '../../containers/write/MarkdownPreviewContainer.svelte';

  export let shadow: boolean = false;
  export let theme: ThemeColorType = 'LIGHT' as const;

  type ThemeColorType = 'LIGHT' | 'DARK';
</script>

<div class="editor-panes-container">
  <div
    class="editor-panes"
    class:shadow
    class:white-editor-mode="{theme === 'LIGHT'}"
    class:black-editor-mode="{theme === 'DARK'}"
  >
    <MarkdownEditorContainer />
  </div>
  <div
    class="preview-panes"
    class:white-preview-mode="{theme === 'LIGHT'}"
    class:black-preview-mode="{theme === 'DARK'}"
  >
    <MarkdownPreviewContainer />
  </div>
</div>
<!-- markup (zero or more items) goes here -->
