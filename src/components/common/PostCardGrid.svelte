<style lang="scss">
  .post-card-grid {
    display: flex;
    margin: -1rem;
    margin-top: 1rem;
    flex-wrap: wrap;

    @media (max-width: 767px) {
      margin: 0;
    }
  }
</style>

<script lang="ts">
  import PostCard from './PostCard.svelte';
  // import PostCardSkeleton from '../skeleton/post/PostCardSkeleton.svelte';

  export let posts = [];
  // export let loading = false;
  export let forHome = false;

  // const skeletons = Array.from({ length: 8 });
</script>

<div class="post-card-grid">
  {#each posts as post}
    <PostCard post="{post}" forHome="{forHome}" />
  {/each}
  <!-- {#if loading}
    {#each skeletons as _}
      <PostCardSkeleton forHome="{forHome}" />
    {/each}
  {/if} -->
</div>
