<script lang="ts">
  import HomeHeader from '../home/HomeHeader.svelte';

  export let hideHeader: boolean = false;
  export let styles: StylesType[] = [];
  export let className: string = '';

  let ref: HTMLDivElement = null;

  $: {
    if (ref && styles.length > 0) {
      styles.map(({ styleName, styleValue }) => {
        ref.style[styleName] = styleValue;
        return;
      });
    }

    if (ref && className) {
      ref.classList.add(className);
    }
  }

  type StylesType = {
    styleName: string;
    styleValue: string;
  };
</script>

<div bind:this="{ref}" class="page-template">
  {#if !hideHeader}
    <HomeHeader />
  {/if}
  <slot>
    <!-- optinal fullback -->
  </slot>
</div>
