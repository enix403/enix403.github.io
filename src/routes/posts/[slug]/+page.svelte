<script lang="ts">
  import type { PageData } from './$types';
  import Post from '$lib/components/Post.svelte';

  const { data }: { data: PageData } = $props();
  const { frontmatter, ContentBody } = data;
</script>

<Post {frontmatter} {ContentBody} />
