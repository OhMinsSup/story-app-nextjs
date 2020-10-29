<script lang="ts">
  import PublishScreenTemplate from '../../components/write/PublishScreenTemplate.svelte';
  import write from '../../store/write';
</script>

<!-- markup (zero or more items) goes here -->
<PublishScreenTemplate visible="{$write.publish}">
  <!-- optional fallback -->
</PublishScreenTemplate>
