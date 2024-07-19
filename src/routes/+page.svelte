<script lang="ts">
  import PostLink from '$lib/components/PostLink.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const { groupedPosts } = data;
</script>

<svelte:head>
  <title>Home | Qateef Ahmad</title>
</svelte:head>

<h1 class="mb-7 border-b border-app-line pb-3 text-4xl font-semibold">Blogs</h1>

{#each groupedPosts as group (group.year)}
  <div class="flex items-start gap-x-5 mb-10">
    <div class="text-app-muted text-xl tracking-wider max-sm:hidden">{group.year}</div>
    <div class="flex-1">
      {#each group.posts as post (post.slug)}
        <PostLink slug={post.slug} frontmatter={post.frontmatter} />
      {/each}
    </div>
  </div>
{/each}
