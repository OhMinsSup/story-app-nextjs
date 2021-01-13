<style lang="scss">
  @import '../../styles/variables.scss';

  .link-tag-item {
    &:hover {
      background: $gray0;
    }
  }

  .tag-item {
    margin-bottom: 0.875rem;
    background: $gray1;
    padding-left: 1rem;
    padding-right: 1rem;
    height: 2rem;
    border-radius: 1rem;
    display: inline-flex;
    align-items: center;
    margin-right: 0.875rem;
    color: $teal7;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;

    @media (max-width: 768px) {
      height: 1.5rem;
      font-size: 0.75rem;
      border-radius: 0.75rem;
      padding-left: 0.75rem;
      padding-right: 0.75rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
  }
</style>

<script lang="ts">
  import { goto } from '@sapper/app';
  import { escapeForUrl } from '../../lib/utils';
  export let name: string = '';
  export let link: boolean = false;
</script>

{#if link}
  <a href="/" class="tag-item link-tag-item" on:click|preventDefault="{() => goto(`/tags/${escapeForUrl(name)}`)}">
    {name}
  </a>
{:else}
  <div class="tag-item">{name}</div>
{/if}
<!-- markup (zero or more items) goes here -->
