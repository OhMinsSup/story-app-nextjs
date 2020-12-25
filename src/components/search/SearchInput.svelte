<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .search-input-wrapper {
    display: flex;
    height: 2.25rem;
    border: 1px solid $gray5;
    padding-left: 0.625rem;
    padding-right: 0.625rem;
    align-items: center;
    transition: all 0.125s ease-in;
    cursor: text;
    .icon {
      transition: all 0.125s ease-in;
      margin-right: 0.5rem;
      width: 1rem;
      height: 1rem;
      fill: $gray5;
      flex-shrink: 0;
    }

    input {
      transition: all 0.125s ease-in;
      font-size: 0.875rem;
      flex: 1;
      display: block;
      line-height: 1rem;
      height: 1rem;
      padding: 0;
      border: none;
      outline: 0;
      color: $gray7;
      background: transparent;
      min-width: 0;
      &::placeholder {
        color: $gray5;
      }
    }
  }
</style>

<script>
  import { tick, onMount, createEventDispatcher } from 'svelte';
  import { debounce } from 'throttle-debounce';
  import SearchIcon from '../../../static/svg/icon-search-2.svg';

  const dispatch = createEventDispatcher();

  export let className = '';
  export let initial = '';
  export let large = false;
  export let searchAsYouType = false;

  let focus = false;
  let value = initial;
  let inputRef = null;
  let searchInputRef = null;

  const onSearch = (keyword) => {
    dispatch('search', {
      keyword: keyword,
    });
  };

  const debouncedSearch = debounce(300, (keyword) => {
    onSearch(keyword);
  });

  const onFocus = () => {
    focus = true;
  };

  const onBlur = () => {
    focus = false;
  };

  const onClick = () => {
    if (!inputRef) return;
    inputRef.focus();
  };

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch(value);
    }
  };

  onMount(async () => {
    if (searchInputRef) {
      (async function () {
        console.log(searchInputRef);
        searchInputRef.classList.add(className);
        await tick();
      })();
    }
  });

  $: {
    if (searchAsYouType) {
      debouncedSearch(value);
    }
  }
</script>

<div class="search-input-wrapper">
  <div class="icon">
    <SearchIcon />
  </div>
  <input placeholder="검색어를 입력하세요" on:focus="{onFocus}" on:blur="{onBlur}" bind:this="{inputRef}" bind:value />
</div>
