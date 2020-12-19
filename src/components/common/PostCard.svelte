<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  // !props.forHome
  .forhome {
    @media (max-width: 1440px) {
      width: calc(25% - 2rem);
    }

    @media (max-width: 1312px) {
      width: calc(33% - 1.8125rem);
    }
  }

  .clamp {
    height: 3.9375rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .style-link {
    display: block;
    color: inherit;
    text-decoration: none;
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
    p {
      margin: 0;
      word-break: break-word;
      overflow-wrap: break-word;
      font-size: 0.875rem;
      line-height: 1.5;
      color: $gray7;
      margin-bottom: 1.5rem;
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
      span {
        color: $gray6;
        b {
          color: $gray8;
        }
      }
    }
    .likes {
      display: flex;
      align-items: center;
      .like-icon {
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.5rem;
      }
    }
  }
</style>

<script>
  import RatioImage from './RatioImage.svelte';
  import { formatDate } from '../../lib/utils';

  import LikeSvg from '../../../static/svg/icon_like.svg';

  export let post = {};
  export let forHome = false;

  const url = `/${post.user.username}/${post.url_slug}`;
</script>

<div class="post-card" class:forhome="{!!forHome}">
  {#if post.thumbnail}
    <a href="{url}" class="style-link">
      <RatioImage widthRatio="{1.916}" heightRatio="{1}" src="{post.thumbnail}" alt="post-thumbnail" />
    </a>
  {/if}
  <div class="post-content" class:clamp="{true}">
    <a href="{url}" class="style-link">
      <h4>{post.title}</h4>
      <div class="description-wrapper">
        <p>{post.short_description.replace(/&#x3A;/g, ':')} {post.short_description.length === 150 && '...'}</p>
      </div>
    </a>
    <div class="sub-info">
      <span>{formatDate(post.released_at)}</span>
      <span class="separator">·</span>
      <span>{post.comments_count}개의 댓글</span>
    </div>
  </div>
  <div class="post-footer">
    <a class="userinfo" href="{`/story/${post.user.username}`}">
      <img src="{post.user.profile.thumbnail}" alt="{`user thumbnail of ${post.user.username}`}" loading="lazy" />
      <span> by <b>{post.user.username}</b> </span>
    </a>
    <div class="likes">
      <div class="like-icon">
        <LikeSvg />
      </div>
      {post.likes}
    </div>
  </div>
</div>
