<style lang="scss">
  @import '../../styles/variables.scss';

  .post-head {
    margin-top: 5.5rem;

    .head-wrapper {
      @media (max-width: 768px) {
        padding-left: 1rem;
        padding-right: 1rem;
      }

      .subinfo {
        display: flex;
        align-items: center;
        font-size: 1rem;
        color: $gray7;
        justify-content: space-between;
        .information {
          .username {
            color: $gray8;
            font-weight: bold;
            a {
              color: inherit;
              text-decoration: none;
              &:hover {
                color: $gray7;
                text-decoration: underline;
              }
            }
          }
          .separator {
            margin-left: 0.5rem;
            margin-right: 0.5rem;
          }
          @media (max-width: 768px) {
            font-size: 0.875rem;
          }
        }
        @media (max-width: 768px) {
          margin-bottom: 0.75rem;
        }
      }
    }

    h1 {
      /* font-family: 'Spoqa Han Sans'; */
      font-size: 3rem;
      line-height: 1.5;
      letter-spacing: -0.02em;
      margin-top: 0;
      font-weight: 800;
      color: $gray8;
      margin-bottom: 2rem;
      word-break: keep-all;
    }

    @media (max-width: 768px) {
      margin-top: 2rem;
      h1 {
        font-size: 2.25rem;
      }
    }
  }
</style>

<script lang="ts">
  import { goto } from '@sapper/app';
  import { formatDate } from '../../lib/utils';
  import TagList from '../common/TagList.svelte';
  import VelogResponsive from '../velog/VelogResponsive.svelte';

  export let title: string = '';
  export let username: string = '';
  export let created_at: number = new Date().getTime();
  export let is_private: boolean = false;
  export let tags: string[] = [];
</script>

<VelogResponsive>
  <div class="post-head">
    <div class="head-wrapper">
      <h1>{title}</h1>
      <div class="subinfo">
        <div class="information">
          <span class="username">
            <a href="/" on:click|preventDefault="{() => goto(`/velog/@${username}`)}">{username}</a>
          </span>
          <span class="separator">&middot;</span>
          <span>{formatDate(created_at)}</span>
          {#if is_private}
            <span class="separator">&middot;</span>
            <!-- Labels -->
          {/if}
        </div>
      </div>
      <TagList link="{true}" tags="{tags}" />
    </div>
  </div>
</VelogResponsive>
