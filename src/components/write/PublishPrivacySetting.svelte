<style lang="scss" global>
  @import '../../styles/variables.scss';

  .PublishPrivacySettingBlock {
    outline: none;
    border: none;
    .contents {
      display: flex;
    }
  }

  .PrivacySettingButton {
    outline: none;
    border: none;
    flex: 1;
    height: 3rem;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    background: white;
    font-size: 1.125rem;
    color: $gray6;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.05);
    padding: 0;
    padding-left: 1rem;
    border-radius: 4px;
    cursor: pointer;
    border: solid 1px transparent;
    &:hover {
      background: #fdfdfd;
    }

    svg {
    }

    & + & {
      margin-left: 1rem;
    }
    .description {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .PrivacySettingButtonActive {
    border: solid 1px $teal5;
    color: $teal5;
  }
</style>

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import GlobeIcon from '../../../static/svg/icon-globe.svg';
  import LockIcon from '../../../static/svg/icon-lock.svg';
  import PublishSection from './PublishSection.svelte';

  const dispatch = createEventDispatcher();

  export let isPrivate: boolean = false;

  const onClickPrivate = (
    e: MouseEvent & {
      target: EventTarget & HTMLButtonElement;
      currentTarget: EventTarget & HTMLButtonElement;
    }
  ) => {
    try {
      const { dataset } = e.currentTarget;
      dispatch('changePrivate', {
        isPrivate: dataset['private'] === 'true' ? true : false,
      });
    } catch (error) {
      console.error(error);
    }
  };
</script>

<div class="PublishPrivacySettingBlock">
  <PublishSection title="공개 설정">
    <button
      type="button"
      class="PrivacySettingButton"
      class:PrivacySettingButtonActive="{!isPrivate}"
      data-private="false"
      on:click="{onClickPrivate}"
    >
      <GlobeIcon />
      <div class="description">전체 공개</div>
    </button>
    <button
      type="button"
      class="PrivacySettingButton"
      class:PrivacySettingButtonActive="{isPrivate}"
      data-private="true"
      on:click="{onClickPrivate}"
    >
      <LockIcon />
      <div class="description">비공개</div>
    </button>
  </PublishSection>
</div>
