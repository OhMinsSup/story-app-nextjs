<script>
  import AuthSocialButton from './AuthSocialButton.svelte';
  export let currentPath = '';
</script>

<div class="social-group">
  <AuthSocialButton provider="github" tabIndex="{4}" currentPath="{currentPath}" />
  <AuthSocialButton provider="google" tabIndex="{5}" currentPath="{currentPath}" />
  <AuthSocialButton provider="facebook" tabIndex="{6}" currentPath="{currentPath}" />
</div>
