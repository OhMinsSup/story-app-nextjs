<script>
  import PostCardGrid from './../components/common/PostCardGrid.svelte';
  import { recentPosts } from '../json/posts';
</script>

<svelte:head>
  <title>최신 포스트 - velog</title>
  <meta name="description" content="벨로그에서 다양한 개발자들이 작성한 따끈따끈한 최신 포스트들을 읽어보세요." />
</svelte:head>

<PostCardGrid posts="{recentPosts.data.posts}" loading="{false}" forHome="{true}" />
