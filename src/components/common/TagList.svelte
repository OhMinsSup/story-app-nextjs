<style lang="scss">
  .tag-list {
    margin-top: 0.875rem;
    margin-bottom: -0.875rem;
    min-height: 0.875rem;
    @media (max-width: 768px) {
      margin-top: 0.5rem;
      margin-bottom: -0.5rem;
      min-height: 0.5rem;
    }
  }
</style>

<script lang="ts">
  import TagItem from './TagItem.svelte';

  export let link: boolean = false;
  export let className: string = '';
  export let tags: string[] = [];
</script>

<div class="tag-list {className}">
  {#each tags as tag, index (`${tag}-${index}`)}
    <TagItem link="{link}" name="{tag}" />
  {/each}
</div>
