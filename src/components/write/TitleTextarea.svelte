<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  textarea {
    display: block;
    padding: 0;
    font-size: 2.75rem;
    width: 100%;
    resize: none;
    line-height: 1.5;
    outline: none;
    border: none;
    font-weight: bold;
    color: $gray9;
    &::placeholder {
      color: $gray5;
    }
  }
</style>

<script>
  export let title = '';
</script>

<textarea value="{title}" on:keyup placeholder="제목을 입력하세요" rows="1" autocomplete="off"></textarea>
