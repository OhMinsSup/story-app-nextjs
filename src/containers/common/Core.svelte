<script lang="ts">
  import { onMount } from 'svelte';
  import AuthModalContainer from '../auth/AuthModalContainer.svelte';

  let Notification = null;

  onMount(async () => {
    // local client side component import
    const module = await import('@beyonk/svelte-notifications');
    Notification = module.NotificationDisplay;
  });
</script>

<AuthModalContainer />
<svelte:component this="{Notification}" />
