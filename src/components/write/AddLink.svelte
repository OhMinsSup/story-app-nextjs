<style lang="scss">
  @import '../../styles/variables.scss';

  .addLink {
    z-index: 5;
    position: absolute;
    margin-bottom: 1rem;
    & > .wrapper {
      margin-top: 1rem;
      width: 20rem;
      background: white;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
      border-radius: 4px;
      .top-wrapper {
        margin-bottom: 1rem;
        .title {
          font-weight: bold;
          color: $gray8;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          font-size: 1.5rem;
          color: $gray5;
          cursor: pointer;
          &:hover {
            color: $gray9;
          }
        }
      }

      form {
        width: 100%;
        display: flex;
        align-items: center;
        input {
          flex: 1;
          border: none;
          outline: none;
          border-bottom: 1px inset $gray5;
          font-size: 1rem;
          margin-right: 0.5rem;
          line-height: 1.5;
          padding: 0;
        }
      }
      padding: 1.5rem 1rem;
    }
  }
</style>

<script lang="ts">
  import { onMount, tick, createEventDispatcher } from 'svelte';
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
