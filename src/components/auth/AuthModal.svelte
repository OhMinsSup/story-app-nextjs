<style lang="scss">
  @import '../../styles/variables.scss';

  .auth-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 25;
    background: rgba(249, 249, 249, 0.85);
    .wrapper {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
      display: flex;
      width: 606px;
      height: 480px;
      @media (max-width: 768px) {
        flex: 1;
        width: auto;
        height: 100%;
      }

      .gray-block {
        @media (max-width: 768px) {
          display: none;
        }

        width: 216px;
        background: $gray1;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .gray-container {
          .icon {
            width: 100%;
            height: auto;
            display: block;
          }

          .welcome {
            display: block;
            font-size: 1.75rem;
            margin-top: 1.5rem;
            color: $gray7;
            text-align: center;
            font-weight: 600;
          }
        }
      }

      .white-block {
        flex: 1;
        background: white;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        @media (max-width: 768px) {
          overflow-y: auto;
        }
        .exit-wrapper {
          display: flex;
          justify-content: flex-end;
          font-size: 1.5rem;
          color: $gray6;
          margin-bottom: 2.25rem;
          .icon {
            width: 25px;
            height: 25px;
            cursor: pointer;
          }
          @media (max-width: 768px) {
            margin-bottom: 0;
          }
        }
        .block-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import { quintIn, quintOut } from 'svelte/easing';
  import { MdClose as CloseIcon } from 'svelte-icons/md';

  import UndrawJoyride from '../../../static/svg/undraw_joyride_hnno.svg';

  export let visible: boolean = false;

  let closed: boolean = true;
  let timeoutId: number | null = null;

  onMount(() => {
    if (visible) {
      closed = false;
    } else {
      timeoutId = setTimeout(() => {
        closed = true;
      }, 200);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  });

  const popIn = (node: Element, { duration = 250 }) => {
    const o = +getComputedStyle(node).opacity;
    return {
      duration,
      css: (t: number) => {
        const eased = quintIn(t);
        return `
          opacity: ${t * o};
					transform: scale(${eased});`;
      },
    };
  };

  const popOut = (node: Element, { duration = 250 }) => {
    const o = +getComputedStyle(node).opacity;
    return {
      duration,
      css: (t: number) => {
        const eased = quintOut(t);
        return `
          opacity: ${t * o};
					transform: scale(${eased});`;
      },
    };
  };
</script>

{#if visible && closed}
  <section class="auth-modal" in:popIn out:popOut>
    <div class="wrapper">
      <article class="gray-block">
        <div class="gray-container">
          <UndrawJoyride class="icon" width="100%" height="100%" />
          <span class="welcome">환영합니다!</span>
        </div>
      </article>
      <article class="white-block">
        <div class="exit-wrapper">
          <span class="icon" on:click>
            <CloseIcon tabIndex="{1}" />
          </span>
        </div>
        <div class="block-content">
          <slot>
            <!-- optional fallback -->
          </slot>
        </div>
      </article>
    </div>
  </section>
{/if}
