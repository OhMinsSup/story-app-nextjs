<style lang="scss">
  .hide-on-mobile {
    @media (max-width: 1024px) {
      display: none;
    }
  }

  .tag-wrapper {
    position: relative;
  }
</style>

<script>
  // your script goes here

  import UserTags from '../../components/velog/UserTags.svelte';
  import VelogSearchInputContainer from './VelogSearchInputContainer.svelte';
</script>

<!-- markup (zero or more items) goes here -->
<div>
  <div class="hide-on-mobile">
    <link
      data-rh="true"
      rel="alternate"
      type="application/rss+xml"
      title="RSS"
      href="{`https://v2.velog.io/rss/veloss`}"
    />
    <VelogSearchInputContainer />
  </div>
  <div class="tag-wrapper">
    <UserTags />
  </div>
</div>
