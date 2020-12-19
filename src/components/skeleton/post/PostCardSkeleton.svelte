<style lang="scss">
  @import '../../../styles/variables.scss';

  .forhome {
    @media (max-width: 1440px) {
      width: calc(25% - 2rem);
    }

    @media (max-width: 1312px) {
      width: calc(33% - 1.8125rem);
    }
  }

  .skeleton-thumbnail-wrapper {
    width: 100%;
    padding-top: 52.19%;
    position: relative;
  }

  .lines {
    height: 3.9375rem;
    font-size: 0.875rem;
    margin-bottom: 1.5rem;
    .line {
      display: flex;
    }
    .line + .line {
      margin-top: 0.3rem;
    }
  }

  .post-card {
    width: 20rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.04);
    transition: 0.25s box-shadow ease-in, 0.25s transform ease-in;
    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 20px 0 rgba(0, 0, 0, 0.08);
      @media (max-width: 1024px) {
        transform: none;
      }
    }

    margin: 1rem;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    @media (max-width: 944px) {
      width: calc(50% - 2rem);
    }

    @media (max-width: 767px) {
      margin: 0;
      width: 100%;
      & + & {
        margin-top: 1rem;
      }
    }
  }

  .post-content {
    padding: 1rem;
    display: flex;
    flex: 1;
    flex-direction: column;
    h4 {
      font-size: 1rem;
      margin: 0;
      margin-bottom: 0.25rem;
      line-height: 1.5;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow-x: hidden;
      overflow-y: hidden;
      color: $gray9;
      @media (max-width: 767px) {
        white-space: initial;
      }
    }
    .description-wrapper {
      flex: 1;
    }

    .sub-info {
      font-size: 0.75rem;
      line-height: 1.5;
      color: $gray6;
      .separator {
        margin-left: 0.25rem;
        margin-right: 0.25rem;
      }
    }
  }

  .post-footer {
    padding: 0.625rem 1rem;
    border-top: 1px solid $gray0;
    display: flex;
    font-size: 0.75rem;
    line-height: 1.5;
    justify-content: space-between;
    .userinfo {
      text-decoration: none;
      color: inherit;
      display: flex;
      align-items: center;
      img {
        object-fit: cover;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        margin-right: 0.5rem;
      }
    }
  }
</style>

<script>
  import SkeletonTexts from '../common/SkeletonTexts.svelte';
  import Skeleton from '../common/Skeleton.svelte';

  export let forHome = false;
</script>

<div class="post-card" class:forhome="{!!forHome}">
  <div class="skeleton-thumbnail-wrapper">
    <Skeleton />
  </div>
  <div class="post-content" clamp="{true}">
    <h4>
      <SkeletonTexts wordLengths="{[2, 4, 3, 6, 5]}" />
    </h4>
    <div class="description-wrapper">
      <div class="lines">
        <div class="line">
          <SkeletonTexts wordLengths="{[2, 4, 3, 6, 2, 7]}" useFlex="{true}" />
        </div>
        <div class="line">
          <SkeletonTexts wordLengths="{[3, 2]}" />
        </div>
      </div>
    </div>
    <div class="sub-info">
      <span>
        <Skeleton width="3rem" />
      </span>
      <span class="separator"></span>
      <span>
        <Skeleton width="4rem" />
      </span>
    </div>
  </div>
  <div class="post-footer">
    <div class="userinfo">
      <Skeleton width="1.5rem" height="1.5rem" marginRight="0.5rem" />
      <span>
        <Skeleton width="6rem" />
      </span>
    </div>
  </div>
</div>
