<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<!-- <main class="bg-[#f3f1e6] min-h-screen"> -->
<main class="bg-[#1C1E1E] min-h-screen">
  <div class="bg-[#262A2B] py-8 px-8">
    <h1 class="text-[2.5rem] leading-9">
      Welcome to my place,
    </h1>
    <p class="text-[#B2ACA2] mt-2 text-lg">
      Qateef Ahmad's Blogs
    </p>
  </div>
  {@render children?.()}
</main>
