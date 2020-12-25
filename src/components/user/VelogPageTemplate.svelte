<style lang="scss">
  .velog-page-template {
    padding-bottom: 4rem;
  }
</style>

<script>
  import PageTemplate from '../base/PageTemplate.svelte';
</script>

<div class="velog-page-template">
  <PageTemplate>
    <slot>
      <!-- optinal fullback -->
    </slot>
  </PageTemplate>
</div>
