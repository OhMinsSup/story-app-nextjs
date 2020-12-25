<script>
  import { onMount } from 'svelte';
  import { userTags } from '../../json/tags';
  import UserTagVerticalList from './UserTagVerticalList.svelte';

  export let username = '';
  export let tag = null;

  let tags = [];
  let postsCount = 0;

  onMount(async () => {
    try {
      const { data } = await Promise.resolve(userTags);
      if (!data) {
        tags = [];
        postsCount = 0;
        return;
      }

      tags = data.tags;
      postsCount = data.posts_count;
    } catch (e) {
      console.error(e);
    }
  });
</script>

<UserTagVerticalList tags="{tags}" postsCount="{postsCount}" username="{username}" activeTag="{tag}" />
