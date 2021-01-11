<script lang="ts">
  import { stores } from '@sapper/app';
  import { onDestroy, onMount } from 'svelte';
  import write from '../../store/write';
  import post from '../../store/post';
  import EditorPanes from '../../components/write/EditorPanes.svelte';

  const { page } = stores();

  let newPost: boolean = false;
  let askLoadTemp: boolean = false;
  let initialized: boolean = false;

  const { id } = $page.query;

  // 컴포넌트 마운트일 때 포스트 정보 가져오기
  onMount(async () => {
    if (initialized) return;

    await post.getPost(id);
    if (!$post.postInfo) return;

    write.changeTags($post.postInfo.tags);
    write.changeMarkDown($post.postInfo.body);
    write.setInitialTitle($post.postInfo.title);
    write.setInitialBody($post.postInfo.body);
    initialized = true;
  });

  // 컴포넌트가 언마운트가 되면 에디터 정보를 clear 시킨다.
  onDestroy(() => {
    write.clearEditor();
  });

  $: if (!id) {
    newPost = true;
  }
</script>

<EditorPanes />
