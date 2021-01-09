<style lang="scss">
  .drag-drop-upload-mask {
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
  }

  .invisible-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    display: block;
  }
</style>

<script lang="ts">
  import { onMount, createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let dragIndex: number = 0;
  let down: boolean = false;
  let dragging: boolean = false;

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    const { files } = e.dataTransfer || { files: null };
    if (!files) return;
    if (!files[0]) return;
    dispatch('upload', {
      file: files[0],
    });

    dragIndex = 0;
    dragging = false;
    e.stopPropagation();
  };

  const onMouseDown = () => {
    down = true;
  };

  const onMouseUp = () => {
    down = false;
  };

  const onDragEnter = () => {
    if (down) return;
    dragIndex += 1;
    if (dragIndex === 1) {
      dragging = true;
    }
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }

    if (!dragging) {
      dragging = true;
    }
  };

  const onDragLeave = () => {
    if (down) return;
    dragIndex -= 1;
    if (dragIndex === 0) {
      dragging = false;
    }
  };

  const onMouseLeave = () => {
    if (dragging) {
      dragging = false;
    }
  };

  onMount(() => {
    window.addEventListener('drop', onDrop);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragleave', onDragLeave);
    document.addEventListener('mouseleave', onMouseLeave);
    return () => {
      window.removeEventListener('drop', onDrop);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragleave', onDragLeave);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  });
</script>

{#if dragging}
  <div class="drag-drop-upload-mask"><input class="invisible-input" type="file" /></div>
{/if}
