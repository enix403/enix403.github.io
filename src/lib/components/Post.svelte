<script lang="ts" module>
  export type Frontmatter = {
    title: string;
    slug: string;
    date: string;
  };
</script>

<script lang="ts">
  import type { Component } from 'svelte';
  let {
    frontmatter,
    ContentBody
  }: {
    frontmatter: Frontmatter;
    ContentBody: Component;
  } = $props();
</script>

<h1>
  <strong>
    {frontmatter.title}
  </strong>
</h1>

<hr />

<ContentBody />
