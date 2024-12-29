<script lang="ts">
  import type { PageData } from './$types';
  import PostWrapper from '$lib/components/PostWrapper.svelte';
  const { data }: { data: PageData } = $props();
  const { frontmatter, ContentBody } = data;
</script>

<PostWrapper {frontmatter} {ContentBody} />
