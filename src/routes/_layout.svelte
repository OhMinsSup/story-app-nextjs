<style lang="scss" global>
  @import '../styles/global.scss';

  main {
    height: 100%;
  }
</style>

<script lang="ts">
  import Core from '../containers/common/Core.svelte';
</script>

<main>
  <slot />
</main>
<Core />
