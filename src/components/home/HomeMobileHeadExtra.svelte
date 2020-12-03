<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .aligner {
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 5;
    transform-origin: top right;
    .container {
      margin-top: 0.5rem;
      width: 12rem;
      box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
      background: white;
      color: $gray9;
      ul {
        list-style: none;
        padding-left: 0;
        margin: 0;
      }
      li {
        font-weight: 600;
        font-size: 0.875rem;
        padding: 0.75rem 1rem;
        a {
          color: inherit;
          text-decoration: none;
        }
      }
      li + li {
        border-top: 1px solid $gray1;
      }
      .contact {
        border-top: 1px solid #f1f3f5;
        padding: 1rem;
        h5 {
          margin: 0;
          font-size: 0.75rem;
        }
        .email {
          color: $gray8;
          font-size: 0.75rem;
        }
      }
    }
  }
</style>

<script lang="ts">
  import { scale } from 'svelte/transition';
  import { sineInOut } from 'svelte/easing';
  import OutsideClickHandler from '../common/OutsideClickHandler.svelte';

  export let visible = false;
  export let exclude = [];
</script>

{#if visible}
  <div class="aligner" transition:scale="{{ opacity: 1, start: 0, easing: sineInOut }}">
    <OutsideClickHandler on:clickoutside exclude="{exclude}">
      <div class="container">
        <ul>
          <li><a href="/velog">공지사항</a></li>
          <li><a href="/tags">태그 목록</a></li>
          <li><a href="/policy/terms">서비스 정책</a></li>
          <li><a href="https://bit.ly/velog-slack" target="_blank" rel="noopener noreferrer">Slack</a></li>
        </ul>
        <div class="contact">
          <h5>문의</h5>
          <div class="email">contact@velog.io</div>
        </div>
      </div>
    </OutsideClickHandler>
  </div>
{/if}
