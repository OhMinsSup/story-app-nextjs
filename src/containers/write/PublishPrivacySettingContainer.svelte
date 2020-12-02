<script lang="ts">
  import PublishPrivacySetting from '../../components/write/PublishPrivacySetting.svelte';
  import write from '../../store/write';

  const onChangePrivate = (event: CustomEvent<{ isPrivate: boolean }>) => {
    write.changePrivate(event.detail.isPrivate);
  };
</script>

<PublishPrivacySetting isPrivate="{$write.isPrivate}" on:changePrivate="{onChangePrivate}" />
