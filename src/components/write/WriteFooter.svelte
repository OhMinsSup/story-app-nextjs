<style lang="scss" scoped>
  .write-footer-block {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 4rem;
    width: 100%;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.85);
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .back-btn {
      height: 2.5rem;
      width: 4rem;
      padding: 0.5rem 1rem;
      -webkit-box-align: center;
      align-items: center;
      background: none;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      display: flex;
      outline: none;
      & > .arrowback-icon {
        height: 1.25rem;
        margin-right: 0.5rem;
      }
    }
    .footer-btn {
      height: 2.5rem;
      font-size: 1.125rem;
      margin-left: 0.75rem;
      margin-top: 0.5rem;
    }
  }
</style>

<script lang="ts">
  import ArrowBackIcon from 'svelte-icons/md/MdArrowBack.svelte';
  import RoundButton from '../common/RoundButton.svelte';

  export let edit = false;
</script>

<div class="write-footer-block">
  <button type="button" class="back-btn">
    <div class="arrowback-icon">
      <ArrowBackIcon />
    </div>
  </button>
  <div class="footer-btn">
    <RoundButton inline="{true}" color="gray">임시저장</RoundButton>
  </div>
  <div class="footer-btn">
    <RoundButton inline="{true}" color="teal">{edit ? '수정하기' : '출간하기'}</RoundButton>
  </div>
</div>
