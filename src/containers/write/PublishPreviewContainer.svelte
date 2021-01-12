<script lang="ts">
  import PublishPreview from '../../components/write/PublishPreview.svelte';
  import { useS3Upload, useUpload } from '../../lib/hooks';
  import write from '../../store/write';

  let file: File = null;

  const onChangeDescription = (event: CustomEvent<{ description: string }>) => {
    const { description } = event.detail;
    if (description) {
      write.changeDescription(description);
    }
  };

  // image file upload
  const onUpload = async () => {
    const payload = await useUpload();
    file = payload;
  };

  const onResetThumbnail = () => {
    write.setPostThumbnail(null);
  };

  // file이 변하면 upload
  $: file &&
    (async function () {
      // 업드에 성공하면 imageUrl이 리턴되는데 리턴되면 값을 변경
      const imageUrl = await useS3Upload(file, { type: 'post' });
      write.setPostThumbnail(imageUrl);
    })();
</script>

<PublishPreview
  title="{$write.title}"
  thumbnail="{$write.thumbnail}"
  description="{$write.description}"
  on:upload="{onUpload}"
  on:changeDescription="{onChangeDescription}"
  on:resetThumbnail="{onResetThumbnail}"
/>
