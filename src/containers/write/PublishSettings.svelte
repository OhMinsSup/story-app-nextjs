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

<script lang="ts">
  import RoundButton from '../../components/common/RoundButton.svelte';
  import PublishPrivacySettingContainer from './PublishPrivacySettingContainer.svelte';
  import write from '../../store/write';

  const onClosePublish = () => {
    write.closePublish();
  };
</script>

<div>
  <PublishPrivacySettingContainer />
</div>
<div class="PublishActionButtons">
  <RoundButton size="default" color="gray" on:click="{onClosePublish}">취소</RoundButton>
  <RoundButton size="default">출간하기</RoundButton>
</div>
