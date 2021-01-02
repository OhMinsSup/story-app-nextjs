<script lang="ts">
  import remark from 'remark';
  import htmlPlugin from 'remark-html';
  import breaks from 'remark-breaks';
  import strip from 'strip-markdown';
  import MarkdownEditor from '../../components/common/MarkdownEditor.svelte';
  import TagInput from '../../components/write/TagInput.svelte';
  import write from '../../store/write';
  import embedPlugin from '../../lib/remark/embedPlugin';
  import { beforeUpdate } from 'svelte';

  const { title, markdown, thumbnail, publish, postId, isTemp, initialBody, initialTitle } = $write;

  const onPublish = () => {
    remark()
      .use(strip)
      .process(markdown.replace(/#(.*?)\n/g, ''), (err: any, file: any) => {
        const text = String(file);
        const sliced = text.replace(/\n/g, '').slice(0, 150);
        write.setDefaultDescription(sliced);
        write.openPublish();
      });
  };

  // 업로드 이미지
  let image: string = '';
  // 이전 이미지
  let prevImage: string = '';

  // 업데이트 이전
  beforeUpdate(() => {
    // 업로드한 이미지와 이전 이미지가 같지 않은 경우 파일 변경
    if (image !== prevImage && !thumbnail && image) {
      write.setPostThumbnail(image);
    }
  });

  $: {
    // 이전 이미지에 저장
    prevImage = image;
  }
</script>

<svelte:head>
  <title>{title ? `(작성중) ${title}` : '새 글 작성'}</title>
</svelte:head>
<MarkdownEditor title="{title}" markdown="{markdown}" initialBody="{initialBody}">
  <div slot="tag-input">
    <TagInput initialTags="{$write.tags}" />
  </div>
</MarkdownEditor>
