<script>
  const { children } = $props();
</script>

<main class="max-w-full py-12 px-8 flex justify-center">
  <div class="max-w-[800px] pb-72">
    {@render children?.()}
  </div>
</main>

<!-- <main>
  {@render children?.()}
</main>
 -->
<!-- <style>
  main {
    width: 800px;
    max-width: 800px;
    /* padding: 48px 24px; */
    margin: auto;
  }
</style> -->
