<style lang="scss">
  @import '../../styles/variables.scss';

  .responsive {
    width: 1728px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: $xxlarge) {
      width: 1376px;
    }

    @media (max-width: $xlarge) {
      width: 1280px;
    }

    @media (max-width: 1312px) {
      width: 912px;
    }

    @media (max-width: 944px) {
      width: calc(100% - 2rem);
    }

    @media (max-width: $small) {
      width: calc(100% - 2rem);
    }
  }
</style>

<div class="responsive">
  <slot>
    <!-- option fallback -->
  </slot>
</div>
