<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const { overflowX, overflowY } = getComputedStyle(window.document.body);
    const prevStyles = {
      overflowX,
      overflowY,
    };

    window.document.body.style.overflowX = 'hidden';
    window.document.body.style.overflowY = 'hidden';
    return () => {
      window.document.body.style.overflowX = prevStyles.overflowX;
      window.document.body.style.overflowY = prevStyles.overflowY;
    };
  });
</script>
