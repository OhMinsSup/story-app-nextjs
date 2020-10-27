<script lang="ts">
  import write from '../../store/write';
  import MarkdownPreview from '../../components/write/MarkdownPreview.svelte';
</script>

<MarkdownPreview title="{$write.title}" markdown="{$write.markdown}" />
