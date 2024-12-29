<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<main class="min-h-screen bg-[--app-bg-color]">
  <div class="bg-[#262A2B] py-8 px-6 md:px-8">
    <h1 class="text-2xl sm:text-3xl md:text-4xl xl:text-[2.5rem] leading-9">Welcome to my place,</h1>
    <p class="md:mt-2 text-sm md:text-lg text-[#B2ACA2]">Qateef Ahmad's Blogs</p>
  </div>

  <div class="mx-auto max-w-[1280px] mb-20">
    <div class="pt-10 px-6 md:px-8">
      {@render children?.()}
    </div>
  </div>
</main>
