<script>
  import './global.css';
  import 'katex/dist/katex.min.css';

  const { children } = $props();
</script>

<main class="min-h-screen bg-[--app-bg-color]">
  <div class="bg-[#262A2B] px-6 py-8 md:px-8">
    <h1 class="text-2xl leading-9 sm:text-3xl md:text-4xl xl:text-[2.5rem]">
      Welcome to my place,
    </h1>
    <p class="text-sm text-[#B2ACA2] md:mt-2 md:text-lg">Qateef Ahmad's Blogs</p>
  </div>

  <div class="mx-auto mb-20 flex max-w-[1280px] items-stretch">
    <div class="flex-1 px-6 pt-10 md:px-8 max-w-full">
      <div class="w-full max-w-full">
        {@render children?.()}
      </div>
    </div>
    <div class="w-56 shrink-0 bg-[#191917] px-4 py-4 text-[0.813rem] max-xl:hidden">
      <h2 class="border-app-line border-b text-lg">About Me</h2>
      <p class="mt-1">
        Hi, I am a self-taught programmer that likes technology, programming, mathematics, and artificial intelligence. Beyond coding, I enjoy writing articles here.
      </p>
      <p class="mt-4">
        I also like 3d modelling, though I have just started and I am total beginner in it.
      </p>
    </div>
  </div>
</main>
