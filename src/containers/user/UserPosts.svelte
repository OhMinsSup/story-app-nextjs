<style>
  /* your styles go here */
</style>

<script>
  import FlatPostCardList from '../../components/common/FlatPostCardList.svelte';
  import { tredingPosts } from '../../json/posts';
</script>

<FlatPostCardList posts="{tredingPosts.data.trendingPosts}" hideUser="{true}" />
