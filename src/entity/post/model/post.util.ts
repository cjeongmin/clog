import fs from 'fs';

import matter from 'gray-matter';

import { Post } from './post.type';

export const parsePostFile = (filePath: string): Post => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    fileName: (filePath.split('/').pop() ?? '').replace(/\.[^/.]+$/, ''),
    title: data.title,
    date: data.date,
    draft: data.draft ?? false,
    thumbnail: data.thumbnail,
    content,
  };
};
