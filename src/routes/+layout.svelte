<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<!-- <main class="bg-[#f3f1e6] min-h-screen"> -->
<main class="bg-[#1C1E1E] min-h-screen">
  {@render children?.()}
</main>
