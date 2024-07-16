<script lang="ts">
  import type { PageData } from './$types';
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
  <div class="post-content w-full max-w-[800px] pb-72 mx-auto">
    <ContentBody />
  </div>
</main>

<style>
  .post-content :global {
    pre {
      @apply overflow-x-auto;
      @apply px-2.5 py-2;
    }

    .math-display {
      @apply overflow-x-auto;
      @apply px-4;
    }
  }
</style>
