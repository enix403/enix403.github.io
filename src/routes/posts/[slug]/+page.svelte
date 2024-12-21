<script lang="ts">
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();
  const { frontmatter, ContentBody } = data;
</script>

<h1>
  This is some post
</h1>

<p>
  {JSON.stringify(frontmatter)}
</p>

<ContentBody />