<style lang="scss" global>
  .PublishActionButtons {
    display: flex;
    justify-content: flex-end;
    .round-btn + .round-btn {
      margin-left: 1rem;
    }
  }
  /* your styles go here */
</style>

<script>
  import RoundButton from '../../components/common/RoundButton.svelte';
  import PublishPrivacySettingContainer from './PublishPrivacySettingContainer.svelte';
</script>

<div>
  <PublishPrivacySettingContainer />
</div>
<div class="PublishActionButtons">
  <RoundButton size="DEFAULT" color="gray">취소</RoundButton>
  <RoundButton size="DEFAULT">출간하기</RoundButton>
</div>
