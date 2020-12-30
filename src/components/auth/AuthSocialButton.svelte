<script lang="ts">
  import { tick } from 'svelte';
  import FacebookIcon from '../../../static/svg/icon-facebook.svg';
  import GithubIcon from '../../../static/svg/icon-github.svg';
  import GoogleIcon from '../../../static/svg/icon-google.svg';

  export let provider: keyof typeof providerMap;
  export let tabIndex: number;
  export let currentPath: string;

  const providerMap = {
    github: {
      color: '#272e33',
      icon: GithubIcon,
      border: false,
    },
    google: {
      color: 'white',
      icon: GoogleIcon,
      border: true,
    },
    facebook: {
      color: '#3b5998',
      icon: FacebookIcon,
      border: false,
    },
  };

  const host = 'http://localhost:8080/';
  const redirectTo = `${host}api/v1.0/auth/social/redirect/${provider}?next=${currentPath}`;

  const info = providerMap[provider];
  const { icon: Icon, color, border } = info;

  let socialRef: HTMLAnchorElement | null = null;

  $: {
    if (socialRef) {
      (async function () {
        if (border) {
          socialRef.classList.add('social-border');
        }

        socialRef.style.background = color;
        await tick();
      })();
    }
  }
</script>

<a bind:this="{socialRef}" class="social-button" tabIndex="{tabIndex}" href="{redirectTo}">
  <Icon />
</a>
