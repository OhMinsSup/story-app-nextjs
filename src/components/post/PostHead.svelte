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

<script>
  import { formatDate } from '../../lib/utils';
  import VelogResponsive from '../velog/VelogResponsive.svelte';

  // your script goes here
</script>

<VelogResponsive>
  <div class="post-head">
    <div class="head-wrapper">
      <h1>타이틀</h1>
      <div class="subinfo">
        <div class="information">
          <span class="username"> <a href="/">veloss</a> </span>
          <span class="separator">&middot;</span>
          <span>{formatDate(new Date().getTime())}</span>
        </div>
      </div>
    </div>
  </div>
</VelogResponsive>
