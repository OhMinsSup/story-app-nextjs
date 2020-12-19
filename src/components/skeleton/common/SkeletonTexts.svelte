<script>
  import Skeleton from './Skeleton.svelte';

  export let wordLengths = [];
  export let useFlex = false;

  const serializeWordLengths = wordLengths.map((w) => {
    const props = {
      [useFlex ? 'flex' : 'width']: useFlex ? w : `${w}rem`,
    };
    return props;
  });
</script>

{#each serializeWordLengths as props}
  <Skeleton {...props} />
{/each}
