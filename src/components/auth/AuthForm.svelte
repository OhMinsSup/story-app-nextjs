<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .auth-form {
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    line-height: 1.5;
    .upper-wrapper {
      @media (max-width: 768px) {
        margin-top: 2rem;
      }
    }
    h2,
    h4 {
      margin: 0;
    }
    h2 {
      font-size: 1.3125rem;
      color: $gray8;
    }
    h4 {
      margin-top: 1rem;
      margin-bottom: 1rem;
      color: $gray6;
    }
    section + section {
      margin-top: 2.5rem;
    }
    .foot {
      @media (max-width: 768px) {
        margin-top: 2rem;
      }
      text-align: right;
      span {
        margin-right: 0.25rem;
      }
      .link {
        display: inline-block;
        font-weight: bold;
        color: $teal6;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>

<script lang="ts">
  import * as yup from 'yup';
  import { createEventDispatcher } from 'svelte';

  import AuthEmailForm from './AuthEmailForm.svelte';
  import AuthEmailSuccess from './AuthEmailSuccess.svelte';

  const dispatch = createEventDispatcher();

  yup.setLocale({
    mixed: {
      required: '이메일은 필수 입력입니다.',
    },
    string: {
      email: '이메일 형식으로 입력해주세요',
    },
  });

  const schema = yup.object().shape({
    email: yup.string().email().required(),
  });

  export let loading: boolean = false;
  export let registered = null;
  export let mode: 'REGISTER' | 'LOGIN' = 'REGISTER';

  let email = '';
  let errorMessage = '';

  const onChangeEmail = (e: KeyboardEvent) => {
    const { value } = e.target as any;
    email = value;
  };

  const onSendEmailSubmit = async () => {
    errorMessage = '';

    try {
      await schema.validate({ email });
      dispatch('sendEmailSubmit', {
        email,
      });

      errorMessage = '';
    } catch (e) {
      errorMessage = e.message;
      console.error(e);
    }
  };

  const onToggleMode = () => dispatch('toggleMode');

  $: modeText = mode === 'REGISTER' ? '회원가입' : '로그인';
</script>

<section class="auth-form">
  <article class="upper-wrapper">
    <h2>{modeText}</h2>
    <section>
      <h4>이메일로 {modeText}</h4>
      {#if registered !== null}
        <AuthEmailSuccess registered="{registered}" />
      {:else}
        <AuthEmailForm
          errorMessage="{errorMessage}"
          email="{email}"
          on:submit="{onSendEmailSubmit}"
          on:keyup="{onChangeEmail}"
          mode="{mode}"
          disabled="{loading}"
        />
      {/if}
    </section>
    <section>
      <h4>소셜 계정으로 {modeText}</h4>
      <!-- <AuthSocialButtonGroup currentPath="{currentPath}" /> -->
    </section>
  </article>
  <article class="foot">
    <span>{mode === 'LOGIN' ? '아직 회원이 아니신가요?' : '계정이 이미 있으신가요?'}</span>
    <div class="link" tabIndex="{7}" on:click="{onToggleMode}">{mode === 'LOGIN' ? '회원가입' : '로그인'}</div>
  </article>
</section>
