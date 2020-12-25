<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .user-tag-vertical-list {
    ul {
      list-style: none;
      padding-left: 0;
    }

    .title {
      font-size: 1rem;
      line-height: 1.5;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid $gray5;
      margin-bottom: 1rem;
      font-weight: bold;
      color: $gray7;
    }

    .list-item {
      color: $gray8;
      font-size: 0.875rem;
      line-height: 1.5;
      a {
        color: inherit;
        text-decoration: none;
        &:hover {
          color: $gray9;
          text-decoration: underline;
          span {
            text-decoration: none;
          }
        }
      }

      span {
        margin-left: 0.5rem;
        color: $gray6;
        font-weight: normal;
      }
      & + & {
        margin-top: 0.25rem;
      }
    }

    .active {
      color: $teal5;
      font-weight: bold;
    }
  }
</style>

<script>
  import SideArea from './SideArea.svelte';
  import { escapeForUrl } from '../../lib/utils.js';

  export let tags = [];
  export let activeTag = null;
  export let postsCount = 0;
  export let username = '';
</script>

<SideArea>
  <div class="user-tag-vertical-list">
    <div class="title">태그 목록</div>
    <ul>
      <li class="list-item" class:active="{activeTag === null}">
        <a href="/velog/{username}">전체보기</a>
        <span>({postsCount})</span>
      </li>
      {#each tags as tag}
        <li class="list-item" class:active="{activeTag === escapeForUrl(tag.name)}">
          <a href="/velog/{username}?tag={escapeForUrl(tag.name)}">{tag.name}</a>
          <span>({tag.posts_count})</span>
        </li>
      {/each}
    </ul>
  </div>
</SideArea>
