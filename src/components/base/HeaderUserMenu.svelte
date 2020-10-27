<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .user-menu {
    position: absolute;
    top: 100%;
    margin-top: 1rem;
    right: 0;
    > .menu-wrapper {
      position: relative;
      z-index: 5;
      width: 12rem;
      background: white;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    }
  }
</style>

<script lang="ts">
  import { stores } from '@sapper/app';

  import OutsideClickHandler from '../common/OutsideClickHandler.svelte';
  import HeaderUserMenuItem from './HeaderUserMenuItem.svelte';

  import { logoutAPI } from '../../api/auth';

  const { session } = stores();

  export let visible: boolean = false;
  export let username: string = '';
  export let exclude: EventTarget[] = [];

  const onClick = async () => {
    try {
      await logoutAPI();
      $session.user = null;
    } catch (e) {
      console.error(e);
    }
  };
</script>

{#if visible}
  <OutsideClickHandler on:clickoutside exclude="{exclude}">
    <div class="user-menu">
      <div class="menu-wrapper">
        <HeaderUserMenuItem to="{`velog/${username}`}">내 벨로그</HeaderUserMenuItem>
        <HeaderUserMenuItem to="saves">임시 글</HeaderUserMenuItem>
        <HeaderUserMenuItem to="lists/liked">읽기 목록</HeaderUserMenuItem>
        <HeaderUserMenuItem to="setting">설정</HeaderUserMenuItem>
        <HeaderUserMenuItem on:click="{onClick}">로그아웃</HeaderUserMenuItem>
      </div>
    </div>
  </OutsideClickHandler>
{/if}
