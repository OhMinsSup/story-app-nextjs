<style lang="scss" scoped>
  @import '../styles/variables.scss';

  .fullscreen {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $gray2;
  }

  .spinner {
    width: 100px;
    height: 100px;
    position: relative;
    animation: sk-chase 2.5s infinite linear both;
    .sk-chase-dot {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      animation: sk-chase-dot 2s infinite ease-in-out both;
    }
    .sk-chase-dot:before {
      content: '';
      display: block;
      width: 25%;
      height: 25%;
      background-color: $teal6;
      border-radius: 100%;
      animation: sk-chase-dot-before 2s infinite ease-in-out both;
    }
    .sk-chase-dot:nth-child(1) {
      animation-delay: -1.1s;
    }
    .sk-chase-dot:nth-child(2) {
      animation-delay: -1s;
    }
    .sk-chase-dot:nth-child(3) {
      animation-delay: -0.9s;
    }
    .sk-chase-dot:nth-child(4) {
      animation-delay: -0.8s;
    }
    .sk-chase-dot:nth-child(5) {
      animation-delay: -0.7s;
    }
    .sk-chase-dot:nth-child(6) {
      animation-delay: -0.6s;
    }
    .sk-chase-dot:nth-child(1):before {
      animation-delay: -1.1s;
    }
    .sk-chase-dot:nth-child(2):before {
      animation-delay: -1s;
    }
    .sk-chase-dot:nth-child(3):before {
      animation-delay: -0.9s;
    }
    .sk-chase-dot:nth-child(4):before {
      animation-delay: -0.8s;
    }
    .sk-chase-dot:nth-child(5):before {
      animation-delay: -0.7s;
    }
    .sk-chase-dot:nth-child(6):before {
      animation-delay: -0.6s;
    }
    @keyframes sk-chase {
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes sk-chase-dot {
      80%,
      100% {
        transform: rotate(360deg);
      }
    }
    @keyframes sk-chase-dot-before {
      50% {
        transform: scale(0.4);
      }
      100%,
      0% {
        transform: scale(1);
      }
    }
  }
</style>

<script lang="ts">
  import { stores, goto } from '@sapper/app';
  import { onMount } from 'svelte';
  import { notifier } from '@beyonk/svelte-notifications';

  import { emailCodeLoginAPI } from '../api/auth';
  import { getCurrentUserProfileAPI } from '../api/user';
  import { VELOG_USER_KEY } from '../config/contants';

  const { page, session } = stores();

  const processLogin = async () => {
    try {
      // post email code login
      await emailCodeLoginAPI($page.query.code);

      // get logiun user profile
      const profileResponse = await getCurrentUserProfileAPI();
      // set localStorage user data

      // login user profile and token data
      const sessionData = {
        ...profileResponse.data.user,
      };

      // set user profile Data
      $session.user = sessionData;
      localStorage.setItem(VELOG_USER_KEY, JSON.stringify(sessionData));
      goto('/');
    } catch (e) {
      console.error(e);
      // TODO: show 401
      notifier.danger('잘못된 접근입니다.', 3000);
      goto('/');
    }
  };

  onMount(() => {
    if (!$page.query.code) {
      // TODO: show 404
      notifier.danger('잘못된 접근입니다.', 3000);
      goto('/');
      return;
    }
    processLogin();
  });
</script>

<div class="fullscreen">
  <div class="spinner">
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
    <div class="sk-chase-dot"></div>
  </div>
</div>
