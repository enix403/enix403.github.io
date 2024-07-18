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
    <div class="flex-1 px-6 pt-10 md:px-8">
      {@render children?.()}
    </div>
    <div class="w-56 shrink-0 bg-[#191917] px-4 py-4 text-[0.813rem] max-md:hidden">
      <h2 class="border-app-line border-b text-lg">About Me</h2>
      <p class="mt-1">
        I'm a self-taught programmer with interests in programming languages, human languages, Rust,
        physics, and online communities to name a few.
      </p>
      <p class="mt-4">
        I'm heavily involved in the Rust programming language, leading the Devtools and Clippy
        teams. I also work at Google on ICU4X.
      </p>
    </div>
  </div>
</main>
