import type { PageLoad } from './$types';

import type { Frontmatter } from '$lib/types/Frontmatter';
import type { Component } from 'svelte';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  // @ts-ignore
  const res = await import("../../../content/post_1/index.md");

  const frontmatter = res.metadata as Frontmatter;
  const ContentBody = res.default as Component;

  return {
    frontmatter,
    ContentBody,
  };
};
