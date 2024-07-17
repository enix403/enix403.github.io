<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<main class="min-h-screen bg-[--app-bg-color]">
  <div class="bg-[#262A2B] px-8 py-8">
    <h1 class="text-[2.5rem] leading-9">Welcome to my place,</h1>
    <p class="mt-2 text-lg text-[#B2ACA2]">Qateef Ahmad's Blogs</p>
  </div>

  <div class="mx-auto max-w-[1200px]">
    <div class="pt-10">
      {@render children?.()}
    </div>
  </div>
</main>
