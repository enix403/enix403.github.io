import type { EntryGenerator } from './$types';

async function getSlugs() {
  const posts = import.meta.glob('../../../content/**/index.md');

  const slugs = Object.keys(posts).map((element) => {
    const lastIndex = element.lastIndexOf('/index.md');
    const firstIndex = element.lastIndexOf('/', lastIndex - 1) + 1;
    const slug = element.slice(firstIndex, lastIndex);
    return slug;
  });

  return slugs;
}

export const entries: EntryGenerator = async () => {
  const slugsArr = await getSlugs();
  return slugsArr.map(slug => ({ slug }));
};
