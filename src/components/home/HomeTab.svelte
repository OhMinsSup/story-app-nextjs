<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .home-tab {
    margin-top: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .tab-container {
      display: flex;
      position: relative;
      width: 14rem;

      @media (max-width: 944px) {
        width: 10rem;
      }

      .tab-link {
        width: 7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.125rem;
        text-decoration: none;
        color: $gray6;
        height: 3rem;

        .icon {
          width: 1.5rem;
          margin-right: 0.5rem;
        }

        &.active {
          color: $gray8;
          font-weight: bold;
        }

        @media (max-width: 944px) {
          font-size: 1rem;
          width: 5rem;
          .icon {
            width: 1.25rem;
          }
        }
      }
    }

    .more {
      cursor: pointer;
      width: 1.5rem;
      color: $gray6;
    }

    .indicator {
      width: 50%;
      height: 2px;
      position: absolute;
      bottom: 0px;
      background: $gray8;
    }

    .mobile-tab-container {
      display: none;
      @media (max-width: 944px) {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
</style>

<script lang="ts">
  import { spring } from 'svelte/motion';
  import { goto, stores } from '@sapper/app';
  import MdTrendingUp from 'svelte-icons/md/MdTrendingUp.svelte';
  import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte';
  import MdMoreVert from 'svelte-icons/md/MdMoreVert.svelte';
  import HomeMobileHeadExtra from './HomeMobileHeadExtra.svelte';

  const { page } = stores();

  const size = spring(50, {
    stiffness: 0.1,
    damping: 0.25,
  });

  let moreButtonRef: HTMLDivElement;
  let indicatorRef: HTMLDivElement;
  let extra = false;

  const onToggleExtra = () => {
    extra = !extra;
  };

  const onOutSideClick = () => {
    extra = false;
  };

  const navigateToRecent = async () => {
    await goto('/recent');
  };

  const navigateToHome = async () => {
    await goto('/');
  };

  $: trendingActive = ['/'].includes($page.path);
  $: recentActive = ['/recent'].includes($page.path);
  $: ['/'].includes($page.path) ? size.set(0) : size.set(50);

  $: {
    if (indicatorRef) {
      indicatorRef.style.left = `${$size}%`;
    }
  }
</script>

<div class="home-tab">
  <div class="tab-container">
    <a href="/" class="tab-link" on:click|preventDefault="{navigateToHome}" class:active="{trendingActive}">
      <div class="icon">
        <MdTrendingUp />
      </div>
      트렌딩
    </a>
    <a href="/" class="tab-link" on:click|preventDefault="{navigateToRecent}" class:active="{recentActive}">
      <div class="icon">
        <MdAccessTime />
      </div>
      최신
    </a>
    <!-- style="left:{$size}%;" -->
    <div class="indicator" bind:this="{indicatorRef}"></div>
  </div>
  <div class="mobile-tab-container" bind:this="{moreButtonRef}">
    <div class="more" on:click="{onToggleExtra}">
      <MdMoreVert />
    </div>
  </div>
  <HomeMobileHeadExtra visible="{extra}" exclude="{[moreButtonRef]}" on:clickoutside="{onOutSideClick}" />
</div>
