import fs from 'fs';
import path from 'path';

import { parsePostFile } from '@/entity/post';

export const getPosts = () => {
  const postsDirectory = path.join(process.cwd(), 'post');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames
    .map((filename) => {
      const filePath = path.join(postsDirectory, filename);
      return parsePostFile(filePath);
    })
    .filter((post) => !post.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
};
