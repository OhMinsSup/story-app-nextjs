<script lang="ts">
  import AuthForm from './../../components/auth/AuthForm.svelte';
  import AuthModal from './../../components/auth/AuthModal.svelte';

  import auth from '../../store/auth';
  import core from '../../store/core';

  const onClose = () => {
    core.closeAuthModal();
  };

  const onToggleMode = () => {
    const nextMode: 'REGISTER' | 'LOGIN' = $core.auth.mode === 'REGISTER' ? 'LOGIN' : 'REGISTER';
    core.changeAuthModalMode(nextMode);
  };

  const onSendAuthEmail = async (e: any) => {
    try {
      await auth.sendEmail(e.detail.email);
    } catch (e) {
      console.error(e);
    }
  };
</script>

<AuthModal visible="{$core.auth.visible}" on:click="{onClose}">
  <AuthForm
    mode="{$core.auth.mode}"
    registered="{$auth.registerd}"
    loading="{$auth.sendEmailLoading}"
    on:toggleMode="{onToggleMode}"
    on:sendEmailSubmit="{onSendAuthEmail}"
  />
</AuthModal>
