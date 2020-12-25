<style lang="scss">
  .sidearea {
    position: relative;
    .container {
      position: absolute;
      width: 11.5rem;
      left: -13.5rem;
      @media (max-width: 1200px) {
        display: none;
      }
    }
  }
</style>

<script>
  // your script goes here
</script>

<div class="sidearea">
  <div class="container">
    <slot>
      <!-- optional fallback -->
    </slot>
  </div>
</div>
