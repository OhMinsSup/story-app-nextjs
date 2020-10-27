<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let child: HTMLDivElement;

  export let exclude: EventTarget[] = [];
  export let customName: string = '';

  function isExcluded(target: EventTarget) {
    let parent = target;
    while (parent) {
      if (exclude.indexOf(parent) >= 0 || parent === child) {
        return true;
      }
      parent = (parent as any).parentNode;
    }
    return false;
  }

  const onClickOutside = (event: MouseEvent) => {
    if (!isExcluded(event.target)) {
      console.log('!!');
      dispatch('clickoutside');
    }
  };

  const onCustomOutSide = (event: MouseEvent) => {
    if (!isExcluded(event.target)) {
      dispatch(customName);
    }
  };
</script>

<svelte:body on:click="{customName ? onCustomOutSide : onClickOutside}" />
<div bind:this="{child}">
  <slot>
    <!-- optional fallback -->
  </slot>
</div>
