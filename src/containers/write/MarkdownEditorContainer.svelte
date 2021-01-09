<script lang="ts">
  import { notifier } from '@beyonk/svelte-notifications';
  import { goto } from '@sapper/app';
  import remark from 'remark';
  import strip from 'strip-markdown';
  import { usePrevious } from 'svelte-previous';

  import MarkdownEditor from '../../components/common/MarkdownEditor.svelte';
  import TagInput from '../../components/write/TagInput.svelte';
  import write from '../../store/write';
  import DragDropUpload from '../../components/common/DragDropUpload.svelte';
  import PasteUpload from '../../components/common/PasteUpload.svelte';
  import { useS3Upload, useUpload } from '../../lib/hooks';
  import { writePostAPI } from '../../api/write';

  const { tags, title, initialBody, markdown } = $write;

  const onPublish = () => {
    remark()
      .use(strip)
      .process($write.markdown.replace(/#(.*?)\n/g, ''), (err: any, file: any) => {
        const text = String(file);
        const sliced = text.replace(/\n/g, '').slice(0, 150);
        write.setDefaultDescription(sliced);
        write.openPublish();
      });
  };

  const onChangeTitle = (event: CustomEvent<{ title: string }>) => {
    write.changeTitle(event.detail.title);
  };

  // 업로드 file
  let file: File | null = null;
  let image: string = '';
  const [currentImage, previousImage] = usePrevious(image);

  // image file upload
  const onUpload = async () => {
    const payload = await useUpload();
    file = payload;
  };

  // drag N drop / Paste upload
  const onDragDropUpload = async (event: CustomEvent<{ file: File }>) => {
    file = event.detail.file;
  };

  // 임시 저장
  const onTempSave = async () => {
    if (!$write.title || !$write.markdown) {
      notifier.danger('제목 또는 내용이 없습니다');
      return;
    }

    const notifySuccess = () => {
      notifier.success('포스트가 임시저장되었습니다.');
    };

    if (!$write.postId) {
      const body = {
        title: $write.title,
        body: $write.markdown,
        tags: $write.tags,
        is_markdown: true,
        is_temp: true,
        is_private: false,
        thumbnail: null,
      };

      const response = await writePostAPI(body);
      if (!response || !response.data) return;
      const { post_id } = response.data;
      write.setPostId(post_id);
      await goto(`/write?id=${post_id}`);
      notifySuccess();
      return;
    }
  };

  // file이 변하면 upload
  $: file &&
    (async function () {
      // 업드에 성공하면 imageUrl이 리턴되는데 리턴되면 값을 변경
      const imageUrl = await useS3Upload(file, { type: 'post' });
      $currentImage = imageUrl;
      image = imageUrl;
    })();
</script>

<svelte:head>
  <title>{$write.title ? `(작성중) ${$write.title}` : '새 글 작성'}</title>
</svelte:head>
<MarkdownEditor
  title="{title}"
  markdown="{markdown}"
  initialBody="{initialBody}"
  lastUploadedImage="{image}"
  previousUploadImage="{$previousImage}"
  on:changeTitle="{onChangeTitle}"
  on:upload="{onUpload}"
  on:tempSave="{onTempSave}"
>
  <div slot="tag-input">
    <TagInput initialTags="{tags}" />
  </div>
</MarkdownEditor>
<DragDropUpload on:upload="{onDragDropUpload}" />
<PasteUpload on:upload="{onDragDropUpload}" />
