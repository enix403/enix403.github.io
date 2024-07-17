<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<main class="bg-[#f3f1e6]">
  {@render children?.()}
</main>
