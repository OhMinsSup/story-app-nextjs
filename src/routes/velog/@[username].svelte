<style lang="scss">
  @import '../../styles/variables.scss';

  .mobile-separator {
    background: $gray1;
    height: 1rem;
    margin-top: 2rem;
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.04), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.04);
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .velog-responsive {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .result-block {
    @media (max-width: 768px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
  }
</style>

<script lang="ts">
  import { stores } from '@sapper/app';
  import VelogTab from '../../components/velog/VelogTab.svelte';
  import UserPosts from '../../containers/velog/UserPosts.svelte';
  import UserPostTabContainer from '../../containers/velog/UserPostTabContainer.svelte';
  import UserProfileContainer from '../../containers/velog/UserProfileContainer.svelte';
  import VelogAbout from '../../containers/velog/VelogAbout.svelte';

  const { page } = stores();
  $: type = 'type' in $page.query ? $page.query.type : 'post';
</script>

<div class="velog-responsive">
  <UserProfileContainer />
  <div class="mobile-separator"></div>
  <VelogTab username="{'veloss'}" tab="{type}" />
  <UserPostTabContainer />
  <div class="result-block">
    {#if type === 'post'}
      <UserPosts />
    {:else}
      <VelogAbout />
    {/if}
  </div>
</div>
