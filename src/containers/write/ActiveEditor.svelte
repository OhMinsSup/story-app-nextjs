<script lang="ts">
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import write from '../../store/write';
  import EditorPanes from '../../components/write/EditorPanes.svelte';

  const { page } = stores();

  let newPost: boolean = false;
  let askLoadTemp: boolean = false;

  export const initialized: boolean = false;

  const { id } = $page.query;

  // 컴포넌트가 언마운트가 되면 에디터 정보를 clear 시킨다.
  onDestroy(() => {
    write.clearEditor();
  });

  $: {
    // new post 인지 체크
    if (!id) {
      newPost = true;
    }
  }
</script>

<EditorPanes />
