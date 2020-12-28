<style lang="scss">
  @import '../../styles/variables.scss';

  .separator {
    border-top: 1px solid $gray2;
  }

  /* your styles go here */
</style>

<script lang="ts">
  import FlatPostCard from './FlatPostCard.svelte';

  export let posts: any[] = [];
  export let hideUser: boolean;
</script>

<div>
  {#each posts as post}
    <FlatPostCard hideUser="{hideUser}" post="{post}" />
  {/each}
</div>
