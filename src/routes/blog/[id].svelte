<style>
  /* your styles go here */
</style>

<script context="module" lang="ts">
  import axios from 'axios';
  import type { GetPostModelResponse } from '../../api/models/post/get-post.model';

  export async function preload(page: any, session: any): Promise<any> {
    const { params } = page;
    if (params.id) {
      const { data, status } = await axios.get<GetPostModelResponse>(`${SERVER_SIDE_API.GET_POST}/${params.id}`);
      if (status === 200) {
        return {
          postInfo: data.post,
          commentCount: data.comment_count,
        };
      }
    }
    return {
      postInfo: null,
      commCount: 0,
    };
  }
</script>

<script lang="ts">
  import type { Post } from '../../api/models/post/post.model';
  import PostContent from '../../components/post/PostContent.svelte';
  import PostHead from '../../components/post/PostHead.svelte';
  import { SERVER_SIDE_API } from '../../config/contants';

  export let postInfo: Post | null;
  export let commentCount: number;
</script>

<svelte:head>
  <title>{postInfo.title}</title>
  <meta name="description" content="간단한 설명" />
  <link rel="canonical" href="http://localhost:3000/blog/{postInfo.id}" />
  <meta property="og:url" content="http://localhost:3000/blog/{postInfo.id}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="{postInfo.title}" />
  <meta property="og:description" content="간단한 설명" />
  <meta property="og:image" content="{postInfo.thumbnail}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{postInfo.title}" />
  <meta name="twitter:description" content="간단한 설명" />
</svelte:head>
{#if postInfo}
  <PostHead {...postInfo} />
  <PostContent body="{postInfo.body}" />
  {commentCount}
{/if}
