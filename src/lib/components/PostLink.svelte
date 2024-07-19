<script lang="ts">
  import { format } from 'date-fns';
  import type { Frontmatter } from '$lib/types/Frontmatter';

  const { slug, frontmatter }: { slug: string; frontmatter: Frontmatter } = $props();
</script>

<div
  class="flex items-start gap-x-4 gap-y-2 border-b border-app-line py-4 first:pt-0 max-md:flex-col-reverse"
>
  <p class="text-app-muted mt-2 shrink-0 text-nowrap font-mono text-[0.7rem] uppercase">
    <!-- Aug 03 -->
    {format(frontmatter.date, 'MMM dd')}
  </p>
  <a
    href={`/posts/${slug}`}
    class="text-app-text flex-1 transition-colors hover:text-yellow-500 active:text-yellow-400"
  >
    <h1 class="max-w-2xl text-inherit md:text-lg lg:text-xl">
      {frontmatter.title}
    </h1>
  </a>
</div>
