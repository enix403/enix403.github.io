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

<h1>
  <strong>
    {frontmatter.title}
  </strong>
</h1>

<hr />

<main class="max-w-full px-4 py-4">
  <div
    class={clsx(
      'mx-auto w-full max-w-[800px] pb-72',
      'post-content',
      'prose prose-neutral',
      'prose-a:text-pink-600 hover:prose-a:text-pink-500 prose-a:no-underline',
    )}
  >
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
