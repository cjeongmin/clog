import { Post } from '@/entity/post';

export const getTableOfContents = (content: Post['content']) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const tableOfContents = [];

  const matches = content.matchAll(headingRegex);
  for (const match of matches) {
    const level = match[1].length;
    const text = match[2].trim();

    tableOfContents.push({
      level,
      text,
      anchor: `anchor-${tableOfContents.length + 1}`,
    });
  }

  return tableOfContents;
};
