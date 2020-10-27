<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .auth-email-form {
    width: 100%;
    display: flex;
    height: 3rem;
    input {
      flex: 1;
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
      padding: 1rem;
      font-size: 1rem;
      border: 1px solid $gray3;
      border-right: none;
      &::placeholder {
        color: $gray6;
      }
    }
    &:disabled {
      background: $gray1;
    }
    button {
      background: $teal6;
      color: white;
      font-size: 1rem;
      font-weight: bold;
      outline: none;
      border: none;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      width: 6rem;
      word-break: keep-all;
      cursor: pointer;
      &:hover,
      &:focus {
        background: $teal5;
      }
      &:disabled {
        background: $gray5;
        color: $gray3;
        cursor: default;
      }
    }
  }

  .error {
    border: 1px solid #fa5252 !important;
  }

  .error-container {
    & > p {
      color: #fa5252;
      font: bold;
    }
  }
</style>

<script lang="ts">
  export let errorMessage: string = '';
  export let disabled: boolean = false;
  export let mode: 'REGISTER' | 'LOGIN' = 'REGISTER';
  export let email: string = '';
</script>

<form class="auth-email-form" on:submit|preventDefault>
  <input value="{email}" class:error="{errorMessage}" on:keyup placeholder="이메일을 입력하세요." />
  <button type="submit" tabIndex="{3}" disabled="{disabled}">{mode === 'REGISTER' ? '회원가입' : '로그인'}</button>
</form>
{#if errorMessage}
  <span class="error-container">
    <p>{errorMessage}</p>
  </span>
{/if}
