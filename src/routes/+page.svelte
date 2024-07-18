<script>
  import PostLink from '$lib/components/PostLink.svelte';
</script>

<h1 class="mb-7 border-b border-app-line pb-3 text-4xl font-semibold">Blogs</h1>

<div class="flex items-start gap-x-5">
  <div class="text-app-muted text-xl tracking-wider">2022</div>
  <div class="flex-1">
    <PostLink />
    <PostLink />
    <PostLink />
  </div>
</div>
