<script lang="ts">
  import { onMount } from 'svelte';
  import { stores } from '@sapper/app';

  import user from '../../store/user';

  import { VELOG_USER_KEY } from '../../config/contants';
  import AuthModalContainer from '../auth/AuthModalContainer.svelte';

  const { session } = stores();

  let Notification = null;

  onMount(async () => {
    // local client side component import
    const module = await import('@beyonk/svelte-notifications');
    Notification = module.NotificationDisplay;

    try {
      // checked login user
      const currentUser = JSON.parse(localStorage.getItem(VELOG_USER_KEY));
      if (!currentUser) return;

      if ($session.user) return;
      $session.user = currentUser;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<AuthModalContainer />
<svelte:component this="{Notification}" />
