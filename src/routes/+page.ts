import type { PageLoad } from './$types';
import type { Frontmatter } from '$lib/types/Frontmatter';

export const load: PageLoad = async () => {
  // Globally import all Markdown files in the content folder
  const postFiles = import.meta.glob('../content/*/index.md');

  const posts: { slug: string; frontmatter: Frontmatter }[] = [];

  for (const path in postFiles) {
    const slugMatch = path.match(/\/content\/([^/]+)\//); // Extract the slug
    if (slugMatch) {
      const slug = slugMatch[1];

      // Import the file and extract metadata
      const postModule = await postFiles[path]();
      // @ts-ignore
      const frontmatter = postModule.metadata as Frontmatter;

      posts.push({ slug, frontmatter });
    }
  }

  return { posts };
};
