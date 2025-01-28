import fs from 'fs';
import matter from 'gray-matter';
import { Post } from './post.type';

export const parsePostFile = (filePath: string): Post => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    date: data.date,
    thumbnail: '/test.png',
    content,
  };
};
