<style lang="scss">
  .write-footer-block {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 4rem;
    width: 100%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back-btn {
    height: 2.5rem;
    width: 7rem;
    padding: 0.5rem 1rem;
    -webkit-box-align: center;
    align-items: center;
    background: none;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    display: flex;
    left: 0;
    outline: none;
    &:hover,
    &:focus {
      background: rgba(0, 0, 0, 0.05);
    }
    & > .arrowback-icon {
      height: 1.25rem;
      width: 100%;
      margin-right: 0.5rem;
    }
  }

  .group {
    justify-content: flex-end;
    align-items: center;
    & > :global(button) {
      height: 2.5rem;
      font-size: 1.125rem;
      margin-left: 0.75rem;
      margin-top: 0.5rem;
      border-radius: 5px !important;
    }
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import ArrowBackIcon from 'svelte-icons/md/MdArrowBack.svelte';
  import RoundButton from '../common/RoundButton.svelte';
  import write from '../../store/write';

  const dispatch = createEventDispatcher();

  export let edit = false;

  const onGoBack = () => {
    history.back();
  };

  const onOpenPublish = () => {
    write.openPublish();
  };

  const onTempSave = () => {
    dispatch('tempSave');
  };
</script>

<div class="write-footer-block">
  <button type="button" class="back-btn" on:click="{onGoBack}">
    <div class="arrowback-icon">
      <ArrowBackIcon />
    </div>
  </button>
  <div class="group">
    <RoundButton inline="{true}" color="gray" on:click="{onTempSave}">임시저장</RoundButton>
    <RoundButton inline="{true}" color="teal" on:click="{onOpenPublish}">{edit ? '수정하기' : '출간하기'}</RoundButton>
  </div>
</div>
