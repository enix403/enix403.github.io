<script>
  const { children } = $props();
</script>

<main>
  {@render children?.()}
</main>

<style>
  main {
    max-width: 800px;
    padding: 48px 0;
    margin: auto;
  }
</style>
