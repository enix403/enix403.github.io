<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<main class="bg-[#E6E7F3]">
  {@render children?.()}
</main>
