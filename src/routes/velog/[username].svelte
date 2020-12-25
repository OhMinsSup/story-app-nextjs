<style lang="scss">
  @import '../../styles/variables.scss';

  .mobile-separator {
    background: $gray1;
    height: 1rem;
    margin-top: 2rem;
    box-shadow: inset 0 8px 8px -8px rgba(0, 0, 0, 0.04), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.04);
    display: none;
    @media (max-width: 768px) {
      display: block;
    }
  }

  .velog-responsive {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
</style>

<script>
  import VelogTab from '../../components/velog/VelogTab.svelte';
  import UserPostTabContainer from '../../containers/user/UserPostTabContainer.svelte';

  import UserProfileContainer from '../../containers/user/UserProfileContainer.svelte';

  // your script goes here
</script>

<div class="velog-responsive">
  <UserProfileContainer />
  <div class="mobile-separator"></div>
  <VelogTab username="{'veloss'}" tab="posts" />
  <!-- <StoryTab username="{username}" tab="{type}" /> -->
  <UserPostTabContainer />
</div>
