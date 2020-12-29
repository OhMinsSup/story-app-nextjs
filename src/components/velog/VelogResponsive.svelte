<style lang="scss">
  .velog-responsive {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
</style>

<script lang="ts">
  import { tick } from 'svelte';

  export let className: string = '';
  export let styleObjs: {
    [key: string]: CSSStyleDeclaration;
  } = {};

  // your script goes here
  let divRef: HTMLDivElement | null = null;

  // create styles
  const styles = Object.entries(styleObjs)
    .filter(([_, value]) => value)
    .map((value) => value);

  $: {
    if (divRef) {
      (async function () {
        if (className) {
          divRef.classList.add(className);
        }

        if (styles) {
          styles.map(([key, value]) => {
            divRef.style[key] = value;
            return [key, value];
          });
        }

        await tick();
      })();
    }
  }
</script>

<div class="velog-responsive" bind:this="{divRef}">
  <slot>
    <!-- optinal fallback -->
  </slot>
</div>
