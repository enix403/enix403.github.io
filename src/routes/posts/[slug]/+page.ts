import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
  const { slug } = params;

  // @ts-ignore
  const res = await import("../../../content/post_1/index.md");

  const frontmatter = res.metadata;
  const ContentBody = res.default;

  return {
    frontmatter,
    ContentBody,
  };
};
