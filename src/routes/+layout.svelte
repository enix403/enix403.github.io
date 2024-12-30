<script lang="ts">
  import './global.css';
  import 'katex/dist/katex.min.css';

  // @ts-ignore
  import SocialIcons from '@rodneylab/svelte-social-icons';

  const { children } = $props();
</script>

<main class="min-h-screen bg-[--app-bg-color]">
  <div class="bg-[#262A2B] px-6 py-8 md:px-8">
    <a href="/">
      <h1 class="text-2xl leading-9 sm:text-3xl md:text-4xl xl:text-[2.5rem]">
        Welcome to my place,
      </h1>
    </a>
    <p class="text-sm text-[#B2ACA2] md:mt-2 md:text-lg">Qateef Ahmad's Blogs</p>
  </div>

  <div class="mx-auto mb-20 flex max-w-[1280px] items-stretch">
    <div class="max-w-full flex-1 px-6 pt-10 md:px-8">
      <div class="w-full max-w-full">
        {@render children?.()}
      </div>
    </div>
    <div class="w-56 shrink-0 bg-[#191917] px-4 py-4 text-[0.813rem] max-xl:hidden">
      <h2 class="border-b border-app-line text-lg">About Me</h2>
      <p class="mt-1">
        Hi, I am a self-taught programmer that likes technology, programming, mathematics, and
        artificial intelligence. Beyond coding, I enjoy writing articles here.
      </p>
      <p class="mt-4">
        I also like 3D modelling, though I have just started and I am total beginner in it.
      </p>

      <div class="mt-2 flex gap-2">
        <a href="https://github.com/enix403"
          ><SocialIcons network="github" bgColor="black" fgColor="white" /></a
        >
        <a href="https://www.linkedin.com/in/qateefahmad003/"
          ><SocialIcons network="linkedin" fgColor="white" /></a
        >
      </div>
    </div>
  </div>
</main>
