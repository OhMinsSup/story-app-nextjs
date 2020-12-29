<style>
  /* your styles go here */
</style>

<script lang="ts">
  import PostContent from '../../components/post/PostContent.svelte';
  import PostHead from '../../components/post/PostHead.svelte';
</script>

<!-- markup (zero or more items) goes here -->
<svelte:head>
  <title>타이틀</title>
  <!-- {post.short_description && (
    <meta name="description" content={post.short_description} />
  )} -->
  <link rel="canonical" href="www.naver.com" />
  <meta property="og:url" content="www.naver.com" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="타이틀" />
  <meta property="og:description" content="설명" />
  <!-- {post.thumbnail && (
    <meta property="og:image" content={post.thumbnail} />
  )} -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="타이틀" />
  <meta name="twitter:description" content="설명" />
  <!-- {post.thumbnail && (
    <meta name="twitter:image" content={post.thumbnail} />
  )} -->
</svelte:head>

<PostHead />
<PostContent />
