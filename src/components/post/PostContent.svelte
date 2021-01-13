<style lang="scss">
  .post-content {
    width: 768px;
    margin: 0 auto;
    margin-top: 5rem;
    @media (max-width: 768px) {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    @media (max-width: 768px) {
      width: 100%;
    }
  }
</style>

<script lang="ts">
  export let body: string = '';
</script>

<div class="post-content">
  {@html body}
</div>
