<script lang="ts">
  import { goto } from '@sapper/app';
  import { tick } from 'svelte';

  export let to: string = '';
  export let size: ButtonSize = 'default';
  export let color: Color = 'teal';
  export let border: boolean = false;
  export let inline: boolean = false;

  let buttonRef: HTMLButtonElement | null = null;

  const navigateToPage = async () => {
    await goto(to);
  };

  type ButtonSize = 'small' | 'default' | 'large';
  type Color = 'teal' | 'gray' | 'darkGray' | 'lightGray' | 'transparent' | 'red';

  $: {
    if (buttonRef) {
      (async function () {
        if (border) {
          buttonRef.classList.add(`round-bcolor-${color}`);
        }

        if (inline) {
          buttonRef.classList.add('round-btn-inline');
        }

        buttonRef.classList.add(`round-color-${color}`);
        buttonRef.classList.add(`round-size-${size}`);
        await tick();
      })();
    }
  }
</script>

<!-- markup (zero or more items) goes here -->
{#if to}
  <button class="round-btn" type="button" bind:this="{buttonRef}" on:click|preventDefault="{navigateToPage}">
    <slot>
      <!-- optiinal fallback -->
    </slot>
  </button>
{:else}
  <button on:click on:submit bind:this="{buttonRef}" class="round-btn">
    <slot>
      <!-- optiinal fallback -->
    </slot>
  </button>
{/if}
