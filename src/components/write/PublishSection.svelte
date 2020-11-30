<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .publish-section-block {
    & > h3 {
      font-size: 1.3125rem;
      color: $gray8;
      line-height: 1.5;
      margin-bottom: 0.5rem;
      margin-top: 0;
    }
    .contents {
    }

    & + & {
      margin-top: 1.5rem;
    }
  }
</style>

<script lang="ts">
  export let title: string = '';
</script>

<section class="publish-section-block">
  <h3>{title}</h3>
  <div class="contents">
    <slot>
      <!-- fallback option -->
    </slot>
  </div>
</section>
