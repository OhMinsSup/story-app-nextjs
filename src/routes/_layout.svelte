<style lang="scss" global>
  @import '../styles/global.scss';
</style>

<script context="module" lang="ts">
  import axios from 'axios';
  import { generateCookie } from '../lib/utils';
  import { SERVER_SIDE_API } from '../config/contants';

  export async function preload(page: any, session: any): Promise<{ user: User | null }> {
    if (session && session.token) {
      axios.defaults.headers.Cookie = '';
      const cookie = generateCookie(session);
      axios.defaults.headers.Cookie = cookie;
      const { data } = await axios.get(SERVER_SIDE_API.GET_CURRENT_USER);

      return {
        user: data.user,
      };
    }

    return {
      user: null,
    };
  }
</script>

<script lang="ts">
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';

  import HomeHeader from '../components/home/HomeHeader.svelte';
  import HomeTab from '../components/home/HomeTab.svelte';
  import MainResponsive from '../components/main/MainResponsive.svelte';

  import Core from '../containers/common/Core.svelte';
  import type { User } from '../api/models/user/user.model';

  const { page, session } = stores();

  export let user: User | null;

  onMount(() => {
    $session.user = user;
  });

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
