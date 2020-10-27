<style lang="scss" scoped>
  .round-btn {
    background: none;
    border: none;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    transition: 0.125s all ease-in;
    &:focus {
      box-shadow: 0px 2px 12px #00000030;
    }
    cursor: pointer;
  }

  :global(.inline-btn + .inline-btn) {
    margin-left: 1rem;
  }

  .border-btn {
    background: white;
    &:hover {
      color: white;
    }
  }

  .default-size {
    height: 2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    border-radius: 1rem;
  }

  .small-size {
    height: 1.5rem;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    font-size: 0.875rem;
    border-radius: 0.75rem;
  }

  .large-size {
    height: 3rem;
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 1.5rem;
  }
</style>

<script lang="ts">
  import { goto } from '@sapper/app';
  import { tick } from 'svelte';

  import { buttonColorMap } from '../../lib/style/palette';

  export let to = '';
  export let size: ButtonSize = 'DEFAULT';
  export let color: Color = 'teal';
  export let border = false;
  export let inline = false;

  let ref: HTMLButtonElement;

  const buttonColor = buttonColorMap[color];

  const navigateToPage = async () => {
    await goto(to);
  };

  type ButtonSize = 'SMALL' | 'DEFAULT' | 'LARGE';
  type Color = 'teal' | 'gray' | 'darkGray' | 'lightGray';

  $: {
    if (ref && border) {
      (async function () {
        ref.style.border = `1px solid ${buttonColor.background}`;
        ref.style.color = buttonColor.background;
        await tick();
      })();
    }
  }
</script>

<!-- markup (zero or more items) goes here -->
{#if to}
  <button
    class="round-btn"
    type="button"
    bind:this="{ref}"
    on:click|preventDefault="{navigateToPage}"
    class:inline-btn="{inline}"
    class:border-btn="{border}"
    class:default-size="{size === 'DEFAULT'}"
    class:small-size="{size === 'SMALL'}"
    class:large-size="{size === 'LARGE'}"
  >
    <slot>
      <!-- optiinal fallback -->
    </slot>
  </button>
{:else}
  <button
    on:click
    on:submit
    bind:this="{ref}"
    class="round-btn"
    class:inline-btn="{inline}"
    class:border-btn="{border}"
    class:default-size="{size === 'DEFAULT'}"
    class:small-size="{size === 'SMALL'}"
    class:large-size="{size === 'LARGE'}"
  >
    <slot>
      <!-- optiinal fallback -->
    </slot>
  </button>
{/if}
