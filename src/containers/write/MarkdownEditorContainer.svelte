<script lang="ts">
  import MarkdownEditor from '../../components/common/MarkdownEditor.svelte';
  import TagInput from '../../components/write/TagInput.svelte';
  import write from '../../store/write';

  let title: string = '';
</script>

<svelte:head>
  <title>{title ? `(작성중) ${title}` : '새 글 작성'}</title>
</svelte:head>
<MarkdownEditor>
  <div slot="tag-input">
    <TagInput initialTags="{$write.tags}" />
  </div>
</MarkdownEditor>
