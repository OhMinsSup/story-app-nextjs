<style lang="scss" scoped>
  @import '../../styles/variables.scss';
  .user-menu-item {
    color: $gray9;
    padding: 0.75rem 1rem;
    line-height: 1.5;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background: $gray0;
    }
  }

  .wrapper-link > a {
    display: block;
    color: inherit;
    text-decoration: none;
  }
</style>

<script lang="ts">
  export let to: string = '';
</script>

{#if to}
  <div class="wrapper-link">
    <a href="{to}">
      <div class="user-menu-item" on:click>
        <slot>
          <!-- option fallback -->
        </slot>
      </div>
    </a>
  </div>
{:else}
  <div class="user-menu-item" on:click>
    <slot>
      <!-- option fallback -->
    </slot>
  </div>
{/if}
