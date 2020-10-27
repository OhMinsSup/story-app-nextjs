<style lang="scss" scoped>
  @import '../../styles/variables.scss';

  .header-user-icon {
    display: flex;
    align-items: center;
    margin-left: 1.25rem;
    cursor: pointer;
    .user-thumbnail {
      display: block;
      height: 2.5rem;
      width: 2.5rem;
      box-shadow: 0px 0 8px rgba(0, 0, 0, 0.085);
      border-radius: 50%;
      object-fit: cover;
      transition: 0.125s all ease-in;
    }
    .icon {
      width: 1.75rem;
      height: 1.75rem;
      margin-left: 0.25rem;
      color: $gray6;
      transition: 0.125s all ease-in;
      margin-right: -0.4375rem;
    }

    &:hover {
      .user-thumbnail {
        box-shadow: 0px 0 12px rgba(0, 0, 0, 0.1);
      }
      .icon {
        color: $gray9;
      }
    }
  }
</style>

<script lang="ts">
  import DropDownIcon from 'svelte-icons/md/MdArrowDropDown.svelte';

  export let username: string = '';
  export let thumbnail: string = '';
</script>

<div class="header-user-icon" on:click>
  <img class="user-thumbnail" src="{thumbnail}" alt="${username}-thumbnail" loading="lazy" />
  <div class="icon">
    <DropDownIcon />
  </div>
</div>
