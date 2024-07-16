<script lang="ts">
  import type { PageData } from './$types';
  import clsx from 'clsx';

  const { data }: { data: PageData } = $props();
  const { frontmatter, ContentBody } = data;
</script>

<svelte:head>
  <title>{frontmatter.title}</title>
</svelte:head>

<!-- ------------------------- -->

<main class="max-w-full px-5 py-4">
  <div
    class={clsx(
      'mx-auto w-full max-w-[800px] pb-40',
      'post-content',
      'prose prose-neutral',
      'prose-a:text-pink-600 hover:prose-a:text-pink-500 prose-a:no-underline'
    )}
  >
    <div class="mt-10">
      <!-- <h1 class="text-center text-[#961bd3]"> -->
      <h1 class="text-center font-semibold font-mono text-[#296FFD]">
        {frontmatter.title}
      </h1>
      <p class="text-slate-500 text-sm font-mono font-thin">December 29, 2021</p>
    </div>
    <ContentBody />
  </div>
</main>

<style>
  .post-content :global {
    pre {
      @apply px-2.5 py-2;
      @apply overflow-x-auto;
    }

    pre * {
      font-style: normal !important;
    }

    .math-display {
      @apply overflow-x-auto;
      @apply px-4;
    }
  }
</style>
