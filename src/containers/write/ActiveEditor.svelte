<script lang="ts">
  import EditorPanes from '../../components/write/EditorPanes.svelte';
  import MarkdownEditorContainer from './MarkdownEditorContainer.svelte';
  import MarkdownPreviewContainer from './MarkdownPreviewContainer.svelte';
</script>

<EditorPanes>
  <div slot="left">
    <MarkdownEditorContainer />
  </div>
  <div slot="right">
    <MarkdownPreviewContainer />
  </div>
</EditorPanes>
