<script lang="ts">
  import PostWrapper from '$lib/components/PostWrapper.svelte';

  import PostBody, { metadata } from './draft-contents/one.md';
</script>

<PostWrapper frontmatter={metadata as any} ContentBody={PostBody} />
