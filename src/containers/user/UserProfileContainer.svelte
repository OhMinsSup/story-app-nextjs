<style lang="scss">
  .white-space {
    margin-top: 5.625rem;
    @media (max-width: 768px) {
      margin-top: 3rem;
    }
  }
</style>

<script lang="ts">
  import UserProfile from '../../components/common/UserProfile.svelte';

  let userInfo = {
    username: 'veloss',
    thumbnail: '',
    display_name: 'laloss',
    short_bio: '짧은 자기소개',
  };

  let profile = {
    email: 'veloss@test.com',
    facebook: 'facebook',
    github: 'github',
    twitter: 'twitter',
    url: 'url',
  };
  // your script goes here
</script>

<svelte:head>
  <title>{userInfo && userInfo.username} ({userInfo && userInfo.display_name}) - velog</title>
  <meta name="description" content="{userInfo && userInfo.short_bio}" />
</svelte:head>

<div class="white-space">
  <UserProfile
    username="{userInfo.username}"
    thumbnail="{userInfo.thumbnail}"
    displayName="{userInfo.display_name}"
    description="{userInfo.short_bio}"
    {...profile}
  />
</div>
