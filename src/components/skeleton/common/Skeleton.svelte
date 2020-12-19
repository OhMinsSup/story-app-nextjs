<style lang="scss" scoped>
  @import '../../../styles/variables.scss';

  .block {
    display: inline-block;
    border-radius: 4px;
    height: 1em;
    background: $gray1;
    animation: shining 1s ease-in-out infinite;
  }

  @keyframes shining {
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  }
</style>

<script>
  import { tick } from 'svelte';

  export let className = '';
  export let width = '';
  export let height = '';
  export let flex = '';
  export let marginRight = '';
  export let borderRadius = '';
  export let paddingBottom = '';
  export let paddingTop = '';
  export let paddingLeft = '';
  export let paddingRight = '';

  let skeletonRef = null;
  const obj = {
    width,
    height,
    flex,
    marginRight,
    paddingBottom,
    paddingTop,
    paddingLeft,
    paddingRight,
    borderRadius,
  };

  // create styles
  const styles = Object.entries(obj)
    .filter(([_, value]) => value)
    .map((value) => value);

  $: {
    if (skeletonRef) {
      (async function () {
        if (className) {
          skeletonRef.classList.add(className);
        }

        if (styles) {
          styles.map(([key, value]) => {
            skeletonRef.style[key] = value;
            return [key, value];
          });
        }

        await tick();
      })();
    }
  }
</script>

<div class="block" bind:this="{skeletonRef}"></div>
