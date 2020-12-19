<style lang="scss" global>
  @import '../styles/global.scss';

  main {
    height: 100%;
  }
</style>

<script lang="ts">
  import { stores } from '@sapper/app';

  import HomeHeader from '../components/home/HomeHeader.svelte';
  import HomeTab from '../components/home/HomeTab.svelte';
  import MainResponsive from '../components/main/MainResponsive.svelte';

  import Core from '../containers/common/Core.svelte';

  const { page } = stores();

  $: isMainPage = ['/', '/recent'].includes($page.path);
</script>

<main>
  {#if isMainPage}
    <HomeHeader />
    <MainResponsive>
      <HomeTab />
      <slot />
    </MainResponsive>
  {:else}
    <slot />
  {/if}
</main>
<Core />
