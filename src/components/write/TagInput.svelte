<style lang="scss">
  @import '../../styles/variables.scss';

  .tag-container {
    color: $gray8;
    font-size: 1.125rem;
    display: flex;
    flex-wrap: wrap;

    .tag {
      color: $gray9;
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      height: 2rem;
      border-radius: 1rem;
      padding-left: 1rem;
      padding-right: 1rem;
      background: $gray1;
      color: $teal7;
      margin-right: 0.75rem;
      transition: ease-in 0.125s;
      cursor: pointer;
      margin-bottom: 0.75rem;
      animation: popIn 0.125s forwards ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }

    .tag-input {
      display: inline-flex;
      outline: none;
      cursor: text;
      font-size: 1.125rem;
      line-height: 2rem;
      margin-bottom: 0.75rem;
      min-width: 8rem;
      border: none;
    }

    .help {
      display: block;
      width: 100%;
      color: $gray7;
      transition: ease-in 0.125s;

      & > .inside {
        position: absolute;
        background: $gray8;
        color: white;
        padding: 0.75rem;
        z-index: 20;
        line-height: 1.5;
        font-size: 0.75rem;
      }
    }
  }

  @keyframes popIn {
    0% {
      opacity: 0.7;
      transform: scale3d(0.8, 0.8, 1);
    }
    100% {
      opacity: 1;
      transform: scale3d(1, 1, 1);
    }
  }
</style>

<script lang="ts">
  import debounce from 'lodash/debounce';
  import { fly } from 'svelte/transition';
  import { uuidv4 } from '../../lib/utils';
  import write from '../../store/write';

  export let initialTags: string[] = [];

  let initTags: boolean = false;
  let tags: string[] = [].concat(initialTags);
  let value: string = '';
  let focus: boolean = false;

  const onChangeInput = (
    e: KeyboardEvent & {
      target: EventTarget & HTMLInputElement;
      currentTarget: EventTarget & HTMLInputElement;
    }
  ) => {
    value = e.target.value;
  };

  const insertTag = (tag: string) => {
    value = '';
    if (tag === '' || tags.includes(tag)) return;
    let processed = tag;
    processed = tag.trim();
    if (processed.indexOf(' #') > 0) {
      const tempTags: string[] = [];
      const regex = /#(\S+)/g;
      let execArray: RegExpExecArray | null = null;
      while ((execArray = regex.exec(processed))) {
        if (execArray !== null) {
          tempTags.push(execArray[1]);
        }
      }

      tags = [...tags, ...tempTags];
      return;
    }

    if (processed.charAt(0) === '#') {
      processed = processed.slice(1, processed.length);
    }

    tags = [...tags, processed];
  };

  const onRemove = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    tags = nextTags;
  };

  const onKeyDown = debounce((e: KeyboardEvent) => {
    if (e.key === 'Backspace' && value === '') {
      tags = tags.slice(0, tags.length - 1);
      return;
    }
    const keys = [',', 'Enter'];
    if (keys.includes(e.key)) {
      // 등록
      e.preventDefault();
      insertTag(value);
    }
  }, 250);

  // $: tags.length && write.changeTags(tags);

  $: if (initialTags.length > 0 && !initTags) {
    initTags = true;
    tags = tags.concat(initialTags);
  }
</script>

<div class="tag-container">
  {#each tags as tag (`${tag}-${uuidv4()}`)}
    <div class="tag" on:click="{() => onRemove(tag)}">{tag}</div>
  {/each}

  <input
    type="text"
    class="tag-input"
    placeholder="태그를 입력하세요."
    bind:value
    on:keypress="{onChangeInput}"
    on:keydown|capture="{onKeyDown}"
    on:focus="{(e) => {
      focus = true;
    }}"
    on:blur="{(e) => {
      focus = false;
    }}"
  />
  <div class="help">
    {#if focus}
      <div class="inside" on:introstart on:outrostart transition:fly="{{ y: 50, duration: 1000 }}">
        쉼표 혹은 엔터를 입력하여 태그를 등록 할 수 있습니다.
        <br />
        등록된 태그를 클릭하면 삭제됩니다.
      </div>
    {/if}
  </div>
</div>
