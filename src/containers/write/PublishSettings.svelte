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
  import { goto } from '@sapper/app';
  import { notifier } from '@beyonk/svelte-notifications';
  import RoundButton from '../../components/common/RoundButton.svelte';
  import PublishPrivacySettingContainer from './PublishPrivacySettingContainer.svelte';
  import write from '../../store/write';

  const onClosePublish = () => {
    write.closePublish();
  };

  const onPublish = async () => {
    if ($write.title.trim() === '') {
      notifier.danger('제목이 비어있습니다.');
      return;
    }

    try {
      await write.writePost({
        title: $write.title,
        body: $write.markdown,
        tags: $write.tags,
        is_temp: false,
        is_markdown: true,
        is_private: $write.isPrivate,
        thumbnail: $write.thumbnail,
      });
      await goto(`/blog/${$write.postId}`);
    } catch (e) {
      notifier.danger('포스트 작성 실패');
    }
  };

  const onEdit = async () => {
    await write.editPost($write.postId, {
      title: $write.title,
      body: $write.markdown,
      tags: $write.tags,
      is_temp: false,
      is_markdown: true,
      is_private: $write.isPrivate,
      thumbnail: $write.thumbnail,
    });

    await goto(`/blog/${$write.postId}`);
  };
</script>

<div>
  <PublishPrivacySettingContainer />
</div>
<div class="PublishActionButtons">
  <RoundButton size="default" color="gray" on:click="{onClosePublish}">취소</RoundButton>
  {#if !!$write.postId && !$write.isTemp}
    <RoundButton size="default" on:click="{onEdit}">수정하기</RoundButton>
  {:else}
    <RoundButton size="default" on:click="{onPublish}">출간하기</RoundButton>
  {/if}
</div>
