<style lang="scss">
  .ratio-image {
    width: 100%;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: block;
      object-fit: cover;
    }
  }
</style>

<script>
  export let widthRatio = 0;
  export let heightRatio = 0;
  export let src = '';
  export let alt = '';
  export let className = '';

  let ratioImageRef = null;
  $: {
    if (ratioImageRef) {
      ratioImageRef.style.paddingTop = `${(heightRatio / widthRatio) * 100}%`;
    }
  }
</script>

<div bind:this="{ratioImageRef}" class="ratio-image {className}"><img src="{src}" alt="{alt}" loading="lazy" /></div>
