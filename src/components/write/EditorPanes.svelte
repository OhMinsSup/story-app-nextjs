<style lang="scss">
  @import '../../styles/variables.scss';

  .editor-panes-container {
    width: 100%;
    height: 100%;
    display: flex;
    animation: fadeIn 0.5s forwards;
    .editor-panes {
      min-width: 0px;
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      position: relative;
      z-index: 1;
      box-shadow: rgba(0, 0, 0, 0.016) 0px 0px 8px;
    }

    .preview-panes {
      min-width: 0;
      flex: 1 1 0%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .shadow {
      z-index: 1;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.015);
    }

    .white-editor-mode {
      background-color: white !important;
    }

    .black-editor-mode {
      background-color: #263238 !important;
    }

    .black-preview-mode {
      background-color: white !important;
    }

    .white-preview-mode {
      background-color: #fbfdfc !important;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

<script lang="ts">
  export let shadow: boolean = false;
  export let theme: ThemeColorType = 'LIGHT' as const;

  type ThemeColorType = 'LIGHT' | 'DARK';
</script>

<div class="editor-panes-container">
  <div
    class="editor-panes"
    class:shadow
    class:white-editor-mode="{theme === 'LIGHT'}"
    class:black-editor-mode="{theme === 'DARK'}"
  >
    <slot name="left">
      <!-- fallback component editor -->
    </slot>
  </div>
  <div
    class="preview-panes"
    class:white-preview-mode="{theme === 'LIGHT'}"
    class:black-preview-mode="{theme === 'DARK'}"
  >
    <slot name="right">
      <!-- fallback component preview -->
    </slot>
  </div>
</div>
<!-- markup (zero or more items) goes here -->
