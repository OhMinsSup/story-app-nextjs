<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .publish-preivew-block {
    .ThumbnailModify {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0.5rem;
      & > .actions {
        display: flex;
        align-items: center;
        button {
          background: none;
          outline: none;
          border: none;
          font-size: 1rem;
          color: $gray6;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
          &:hover {
            color: $gray5;
          }
          &:active {
            color: $gray7;
          }
        }
        .middledot {
          margin-left: 0.5rem;
          margin-right: 0.5rem;
          display: block;
          width: 2px;
          height: 2px;
          border-radius: 1px;
          background: $gray6;
        }
      }
    }

    .Thumbnail {
      width: 100%;
      padding-top: 55.11%;
      position: relative;
      .thumbnail-block {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
        & > img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        & > .missing-thumbnail {
          background: $gray2;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .upload-btn {
            margin-top: 1rem;
            padding: 0.25rem 2rem;
            background: white;
            border-radius: 4px;
            box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.025);
            font-size: 1rem;
            line-height: 1.5;
            color: $teal5;
            outline: none;
            border: none;
            cursor: pointer;
            transition: all 0.125s ease-in;
            font-weight: bold;
            &:focus {
              box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
            }
            &:hover {
              background: $gray0;
            }
          }
        }
      }
    }

    .PostInfo {
      margin-top: 1.5rem;
      h4 {
        line-height: 1.5;
        margin: 0;
        display: block;
        font-size: 1.125rem;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow-x: hidden;
        overflow-y: hidden;
      }

      textarea {
        resize: none;
        width: 100%;
        border: none;
        outline: none;
        box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.03);
        line-height: 1.5;
        font-size: 0.875rem;
        height: 7.375rem;
        padding: 0.75rem 1rem;
        margin-top: 0.5rem;
      }

      .text-limit {
        text-align: right;
        margin-top: 0.25rem;
        font-size: 0.75rem;
        color: $gray6;
      }

      .limit {
        color: $red6;
      }
    }
  }
</style>

<script lang="ts">
  // your script goes here
  import PublishSection from './PublishSection.svelte';
  import ImageVector from '../../../static/svg/vector-image.svg';

  export let title: string = '';
  export let thumbnail: string = '';
  export let description: string = '';
</script>

<div class="publish-preivew-block">
  <PublishSection title="포스트 미리보기">
    {#if !!thumbnail}
      <div class="ThumbnailModify">
        <div class="actions">
          <button>재업로드</button>
          <div class="middledot"></div>
          <button>제거</button>
        </div>
      </div>
    {/if}
    <div class="Thumbnail">
      <div class="thumbnail-block">
        {#if thumbnail}
          <img src="{thumbnail}" alt="preview-thumbnail" />
        {:else}
          <div class="missing-thumbnail">
            <ImageVector />
            <button type="button" class="upload-btn">썸네일 업로드</button>
          </div>
        {/if}
      </div>
    </div>
    <div class="PostInfo">
      <h4>{title}</h4>
      <textarea placeholder="당신의 포스트를 짧게 소개해보세요." bind:value="{description}"></textarea>
      <div class="text-limit" class:limit="{description.length === 150}">{description.length}/150</div>
    </div>
  </PublishSection>
</div>
