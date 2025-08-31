import fs from 'fs';

import matter from 'gray-matter';

import { Post } from './post.type';

export const parsePostFile = (filePath: string): Post => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    content,
    date: data.date,
    description: data.description,
    draft: data.draft ?? false,
    fileName: (filePath.split('/').pop() ?? '').replace(/\.[^/.]+$/, ''),
    tags: data.tags,
    thumbnail: data.thumbnail,
    title: data.title,
  };
};
