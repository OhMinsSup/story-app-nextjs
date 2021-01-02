<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import FormatBoldIcon from 'svelte-icons/md/MdFormatBold.svelte';
  import FormatItalicIcon from 'svelte-icons/md/MdFormatItalic.svelte';
  import FormatStrikethroughIcon from 'svelte-icons/md/MdFormatStrikethrough.svelte';
  import InsertLinkIcon from 'svelte-icons/md/MdInsertLink.svelte';
  import FormatQuoteIcon from 'svelte-icons/md/MdFormatQuote.svelte';
  import ImageIcon from 'svelte-icons/md/MdImage.svelte';
  import CodeIcon from 'svelte-icons/md/MdCode.svelte';

  export let innerRef: HTMLDivElement;
  export let shadow: boolean = false;

  const dispath = createEventDispatcher();

  const onClickToolbar = (mode: string) => {
    try {
      dispath('clickToolbar', {
        mode,
      });
    } catch (e) {
      console.error(e);
    }
  };
</script>

<div class="toolbar" id="toolbar" class:shadow bind:this="{innerRef}">
  <button type="button" class="toolbarItem ql-header" value="1" on:click="{() => onClickToolbar('heading1')}">
    <div class="heading">H<span>1</span></div>
  </button>
  <button type="button" class="toolbarItem ql-header" value="2" on:click="{() => onClickToolbar('heading2')}">
    <div class="heading">H<span>2</span></div>
  </button>
  <button type="button" class="toolbarItem ql-header" value="3" on:click="{() => onClickToolbar('heading3')}">
    <div class="heading">H<span>3</span></div>
  </button>
  <button type="button" class="toolbarItem ql-header" value="4" on:click="{() => onClickToolbar('heading4')}">
    <div class="heading">H<span>4</span></div>
  </button>
  <div class="separator">
    <!--  separator -->
  </div>
  <button type="button" class="toolbarItem ql-bold" on:click="{() => onClickToolbar('bold')}">
    <div class="icon">
      <FormatBoldIcon />
    </div>
  </button>

  <button type="button" class="toolbarItem ql-italic" on:click="{() => onClickToolbar('italic')}">
    <div class="icon">
      <FormatItalicIcon />
    </div>
  </button>

  <button type="button" class="toolbarItem ql-strike" on:click="{() => onClickToolbar('strike')}">
    <div class="icon">
      <FormatStrikethroughIcon />
    </div>
  </button>

  <button type="button" class="toolbarItem ql-blockquote" on:click="{() => onClickToolbar('blockquote')}">
    <div class="icon">
      <FormatQuoteIcon />
    </div>
  </button>
  <div class="separator">
    <!--  separator -->
  </div>
  <button type="button" class="toolbarItem ql-link" on:click="{() => onClickToolbar('link')}">
    <div class="icon">
      <InsertLinkIcon />
    </div>
  </button>

  <button type="button" class="toolbarItem ql-image" on:click="{() => onClickToolbar('image')}">
    <div class="icon">
      <ImageIcon />
    </div>
  </button>

  <button type="button" class="toolbarItem ql-code-block" on:click="{() => onClickToolbar('codeblock')}">
    <div class="icon">
      <CodeIcon />
    </div>
  </button>
</div>
