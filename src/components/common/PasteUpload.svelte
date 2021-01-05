<script lang="ts">
  import { onMount } from 'svelte';

  const onPaste: EventListener = (e) => {
    const { clipboardData } = e as ClipboardEvent;
    if (!clipboardData) return;

    const { items } = clipboardData;
    if (items.length === 0) return;

    const itemsArray = (() => {
      const array = [];
      for (let i = 0; i < items.length; i++) {
        array.push(items[i]);
      }
      return array;
    })();

    const fileItem = itemsArray.filter((item) => item.kind === 'file')[0];
    if (!fileItem || !fileItem.getAsFile) return;
    const file = fileItem.getAsFile();
    if (!file) return;

    e.preventDefault();
  };

  onMount(() => {
    window.addEventListener('paste', onPaste);
    return () => {
      window.removeEventListener('paste', onPaste);
    };
  });
</script>
