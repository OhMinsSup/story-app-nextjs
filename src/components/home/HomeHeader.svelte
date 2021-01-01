<style lang="scss">
  .main-header {
    height: 4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;

    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;

      .right {
        display: flex;
        align-items: center;
        position: relative;
        .search-button {
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          width: 2.5rem;
          height: 2.5rem;
          outline: none;
          border-radius: 50%;
          cursor: pointer;
          margin-right: 0.75rem;
          &:hover {
            background: rgba(0, 0, 0, 0.045);
          }
        }
      }
    }
  }
</style>

<script lang="ts">
  import { goto, stores } from '@sapper/app';

  import HeaderUserIcon from './../base/HeaderUserIcon.svelte';
  import RoundButton from '../common/RoundButton.svelte';
  import MainResponsive from '../main/MainResponsive.svelte';
  import HeaderUserMenu from '../base/HeaderUserMenu.svelte';

  import core from '../../store/core';

  import Logo from '../../../static/svg/logo.svg';
  import Search from '../../../static/svg/search2.svg';
  import { defaultThumbnail } from '../../config/contants';

  const { session } = stores();

  let triggerEl: HTMLDivElement | null = null;
  let userMenu = false;

  const onToggleUserMenu = () => {
    userMenu = !userMenu;
  };

  const onOutSideClick = (e: CustomEvent<HTMLDivElement>) => {
    userMenu = false;
  };

  const onLoginClick = () => {
    document.body.style.overflowY = 'hidden';
    core.showAuthModal('LOGIN');
  };
</script>

<!-- markup (zero or more items) goes here -->
<section class="main-header">
  <MainResponsive>
    <div class="header-container">
      <a href="." class="logo-container">
        <Logo width="71" height="30" fill="none" />
      </a>
      {#if $session.user}
        <div class="right">
          <div class="search-button">
            <a href="search">
              <Search width="17" height="17" viewBox="0 0 17 17" />
            </a>
          </div>
          <div class="write-button">
            <RoundButton color="darkGray" to="/write">새 글 작성</RoundButton>
          </div>
          <div bind:this="{triggerEl}">
            <HeaderUserIcon
              username="{$session.user.username}"
              thumbnail="{$session.user.thumbnail || defaultThumbnail}"
              on:click="{onToggleUserMenu}"
            />
          </div>
          <HeaderUserMenu
            visible="{userMenu}"
            exclude="{[triggerEl]}"
            username="{$session.user.username}"
            on:clickoutside="{onOutSideClick}"
          />
        </div>
      {:else}
        <div class="right">
          <div class="search-button">
            <a href="search">
              <Search width="17" height="17" viewBox="0 0 17 17" />
            </a>
          </div>
          <RoundButton color="darkGray" border on:click="{onLoginClick}">로그인</RoundButton>
        </div>
      {/if}
    </div>
  </MainResponsive>
</section>
