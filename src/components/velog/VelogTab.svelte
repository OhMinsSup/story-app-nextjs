<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .velog-tab {
    margin-top: 4.5rem;
    margin-bottom: 4.5rem;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      margin-top: 0;
      margin-bottom: 1.5rem;
    }

    .tab-wrapper {
      display: flex;
      position: relative;
      @media (max-width: 768px) {
        width: 100%;
      }

      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.325rem;
        width: 8rem;
        height: 3rem;
        color: $gray7;
        text-decoration: none;
        transition: 0.25s color ease-in-out;
        font-weight: 600;
        @media (max-width: 768px) {
          flex: 1;
          font-size: 1rem;
          height: 2.5rem;
        }

        &.active {
          color: $teal5;
          /* font-weight: bold; */
        }
      }
    }
  }

  .indicator {
    width: 8rem;
    height: 2px;
    background: $teal5;
    position: absolute;
    bottom: -2px;
    transition: 0.25s left ease-in-out;
    @media (max-width: 768px) {
      width: 50%;
    }
  }
</style>

<script>
  import { tick } from 'svelte';

  export let tab = 'posts';
  export let username = '';

  let indicatorRef = null;

  const tabIndexMap = {
    posts: 0,
    about: 1,
  };

  $: withPrefixUrl = (prefix) => {
    return prefix ? `/velog/${username}/${prefix}` : `/story/${username}`;
  };

  $: tabIndex = tabIndexMap[tab];

  $: {
    (async function () {
      if (indicatorRef) {
        indicatorRef.style.left = `${tabIndex * 50}%`;
        await tick();
      }
    })();
  }
</script>

<div class="velog-tab">
  <div class="tab-wrapper">
    <a href="{withPrefixUrl('')}" class="tab" class:active="{tabIndex === 0}">글</a>
    <a href="{withPrefixUrl('about')}" class="tab" class:active="{tabIndex === 1}">소개</a>
    <div class="indicator" bind:this="{indicatorRef}"></div>
  </div>
</div>
