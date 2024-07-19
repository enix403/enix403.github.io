<script lang="ts">
  import PostLink from '$lib/components/PostLink.svelte';
  import type { PageData } from './$types';

  const { data }: { data: PageData } = $props();
  const { groupedPosts } = data;

  console.log(groupedPosts);

</script>

<h1 class="mb-7 border-b border-app-line pb-3 text-4xl font-semibold">Blogs</h1>

<div class="flex items-start gap-x-5">
  <div class="text-app-muted text-xl tracking-wider max-sm:hidden">2022</div>
  <div class="flex-1">
    <PostLink />
    <PostLink />
    <PostLink />
  </div>
</div>
