<script>
  import PostCardGrid from './../components/common/PostCardGrid.svelte';
  import { tredingPosts } from '../json/posts';
</script>

<svelte:head>
  <title>velog</title>
  <link rel="canonical" href="https://velog.io/" />
</svelte:head>

<PostCardGrid posts="{tredingPosts.data.trendingPosts}" loading="{false}" forHome="{true}" />
