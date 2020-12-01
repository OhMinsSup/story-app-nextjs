<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .publish-screen-template {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $gray0;
    z-index: 15;
    // animation: slideUp 0.25s forwards ease-in;
    @media (max-width: 1024px) and (orientation: landscape) {
      align-items: flex-start;
      padding-top: 2rem;
      padding-bottom: 2rem;
      overflow: auto;
    }

    .wrapper {
      width: 768px;
      display: flex;

      .left-pane {
        flex: 1;
        min-width: 0;
      }

      .right-pane {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .separator {
        width: 1px;
        min-height: 425px;
        background: $gray2;
        margin-left: 2rem;
        margin-right: 2rem;
      }
    }
  }

  //   @keyframes slideUp {
  //     0% {
  //       transform: translateY(100%);
  //     }
  //     100% {
  //       transform: translateY(0%);
  //     }
  //   }

  //   @keyframes slideDown {
  //     0% {
  //       transform: translateY(0%);
  //     }
  //     100% {
  //       transform: translateY(100%);
  //     }
  //   }

  //   .up {
  //     animation: slideUp 0.25s forwards ease-in;
  //   }

  //   .down {
  //     animation: slideDown 0.125s forwards ease-out;
  //   }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import PublishPreviewContainer from '../../containers/write/PublishPreviewContainer.svelte';
  import PublishSettings from '../../containers/write/PublishSettings.svelte';
  import HideScroll from '../common/HideScroll.svelte';

  export let visible = false;

  let animate = false;
  let timeoutId: number | null = null;

  onMount(() => {
    if (visible) {
      animate = true;
    } else if (!visible && animate) {
      timeoutId = setTimeout(() => {
        animate = false;
      }, 100);
    }
    return {
      if(timeoutId) {
        clearTimeout(timeoutId);
      },
    };
  });
</script>

{#if !visible && !animate}
  <div></div>
{:else}
  <div class="publish-screen-template" in:slide="{{ duration: 125 }}">
    <div class="wrapper">
      <div class="left-pane">
        <PublishPreviewContainer />
      </div>
      <div class="separator"></div>
      <div class="right-pane">
        <PublishSettings />
      </div>
    </div>
    <HideScroll />
  </div>
{/if}
