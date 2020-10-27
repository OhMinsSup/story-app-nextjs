<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .auth-email-success {
    display: flex;
    align-items: center;
    background: $teal1;
    border: 1px solid $teal2;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    height: 3rem;
    color: $teal7;
    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
    .description {
      font-size: 0.875rem;
      flex: 1;
      text-align: center;
    }
  }
</style>

<script lang="ts">
  import CheckIcon from 'svelte-icons/md/MdCheck.svelte';

  export let registered: boolean = false;
</script>

<div class="auth-email-success">
  <span class="icon">
    <CheckIcon tabIndex="{1}" />
  </span>
  <p class="description">{registered ? '로그인' : '회원가입'} 링크가 이메일로 전송되었습니다.</p>
</div>
