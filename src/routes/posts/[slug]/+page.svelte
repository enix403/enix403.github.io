<script lang="ts">
  import type { PageData } from './$types';
  const { data }: { data: PageData } = $props();
  const { frontmatter, ContentBody } = data;
</script>

<h1>
  <strong>
    {frontmatter.title}
  </strong>
</h1>

<hr />

<main class="flex max-w-full justify-center px-4 lg:px-24 py-4">
  <div class="w-full max-w-[800px] pb-72 post-content">
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
