<script lang="ts">
  import PublishPreview from '../../components/write/PublishPreview.svelte';
  import write from '../../store/write';

  const onChangeDescription = (event: CustomEvent<{ description: string }>) => {
    const { description } = event.detail;
    if (description) {
      write.changeDescription(description);
    }
  };
</script>

<PublishPreview title="{$write.title}" on:changeDescription="{onChangeDescription}" />
