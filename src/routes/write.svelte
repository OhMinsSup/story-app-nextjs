<style lang="scss" scoped>
  .write-page {
    width: 100%;
    height: 100%;
  }
</style>

<script lang="ts">
  import ActiveEditor from '../containers/write/ActiveEditor.svelte';
  import PublishScreen from '../containers/write/PublishScreen.svelte';
</script>

<div class="write-page">
  <ActiveEditor />
  <PublishScreen />
</div>
