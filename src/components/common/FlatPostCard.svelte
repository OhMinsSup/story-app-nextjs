<style lang="scss">
  @import '../../styles/variables.scss';
  /* your styles go here */
  .flat-post-card {
    padding-top: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid $gray2;
    line-height: 1.5;

    @media (max-width: 767px) {
      padding-top: 2rem;
      padding-bottom: 2rem;
    }

    &:first-child {
      padding-top: 0;
    }

    .user-info {
      display: flex;
      align-items: center;
      img {
        width: 3rem;
        height: 3rem;
        display: block;
        margin-right: 1rem;
        background: $gray0;
        object-fit: cover;
        border-radius: 1.5rem;
        box-shadow: 0px 0 8px rgba(0, 0, 0, 0.1);
        @media (max-width: 767px) {
          width: 2rem;
          height: 2rem;
          border-radius: 1rem;
        }
      }
      .username {
        font-size: 0.875rem;
        color: $gray9;
        font-weight: bold;
        a {
          color: inherit;
          text-decoration: none;
          &:hover {
            color: $gray8;
          }
        }
      }
      margin-bottom: 1.5rem;
      @media (max-width: 767px) {
        margin-bottom: 0.75rem;
      }
    }

    .post-thumbnail {
      margin-bottom: 1rem;
    }

    .title {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
      margin-top: 1.1rem;
      color: $gray9;
      word-break: keep-all;
      @media (max-width: 767px) {
        font-size: 1rem;
      }
    }

    .description {
      margin-bottom: 2rem;
      margin-top: 0.5rem;
      font-size: 1rem;
      color: $gray7;
      word-break: keep-all;
      overflow-wrap: break-word;
      @media (max-width: 767px) {
        font-size: 0.875rem;
        margin-bottom: 1.5rem;
      }
    }

    .subinfo {
      display: flex;
      align-items: center;
      margin-top: 1rem;
      color: $gray6;
      font-size: 0.875rem;
      @media (max-width: 767px) {
        font-size: 0.75rem;
      }

      .separator {
        margin-left: 0.5rem;
        margin-right: 0.5rem;
      }
    }

    .tags-wrapper {
      margin-bottom: -0.875rem;
      @media (max-width: 767px) {
        margin-bottom: -0.5rem;
      }
    }
  }
</style>

<script lang="ts">
  import { formatDate } from '../../lib/utils';
  import RatioImage from './RatioImage.svelte';

  export let post: any;
  export let hideUser: boolean = false;
</script>

<div class="flat-post-card">
  {#if !hideUser}유저{/if}
  {#if post.thumbnail}
    <RatioImage
      src="{post.thumbnail}"
      alt="post-thumbnail"
      widthRatio="{1.91}"
      heightRatio="{1}"
      className="post-thumbnail"
    />
  {/if}

  <h2 class="title">{post.title}</h2>
  <p class="description">{post.short_description}</p>
  <div class="tags-wrapper">tag</div>
  <div class="subinfo">
    <span>{formatDate(post.released_at)}</span>
    <div class="separator">·</div>
    <span>{post.comments_count}개의 댓글</span>
  </div>
</div>
