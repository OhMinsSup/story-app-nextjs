<script lang="ts">
  import { onMount, tick, createEventDispatcher } from 'svelte';
  import { MdClose as CloseIcon } from 'svelte-icons/md';

  import DeleteIcon from 'svelte-icons/md/MdDelete.svelte';
  import RoundButton from '../common/RoundButton.svelte';

  const dispatch = createEventDispatcher();

  export let defaultValue = '';
  export let left = 0;
  export let top = 0;
  export let bottom = 0;
  export let stickToRight = false;

  let value = '';
  let inputRef: HTMLInputElement;
  let addLinkRef: HTMLDivElement;

  onMount(() => {
    if (!inputRef) return;
    inputRef.focus();
  });

  const onSubmit = (
    e: Event & {
      currentTarget: EventTarget & HTMLFormElement;
    }
  ) => {
    try {
      dispatch('confirmAddLink', {
        link: value,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const onClose = () => {
    dispatch('close');
  };

  $: {
    if (addLinkRef) {
      (async function () {
        addLinkRef.style.left = stickToRight ? 'initial' : `${left}px`;
        addLinkRef.style.top = `${top}px` || 'initial';
        addLinkRef.style.bottom = `${bottom}px` || 'initial';
        addLinkRef.style.right = stickToRight ? '3rem' : 'initial';
        await tick();
      })();
    }
  }
</script>

<div class="addLink" bind:this="{addLinkRef}">
  <div class="wrapper">
    <span class="icon" on:click="{onClose}">
      <CloseIcon />
    </span>
    <div class="top-wrapper">
      <div class="title">링크 {defaultValue ? '수정' : '등록'}</div>
      {#if defaultValue}
        <DeleteIcon />
      {/if}
    </div>
    <!--  -->
    <form on:submit|preventDefault="{onSubmit}">
      <input bind:value bind:this="{inputRef}" placeholder="URL 을 입력하세요" />
      <RoundButton color="darkGray" size="small">확인</RoundButton>
    </form>
  </div>
</div>
<!-- markup (zero or more items) goes here -->
