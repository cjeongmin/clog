import { parsePostFile } from '@/entity/post';
import fs from 'fs';
import path from 'path';

export const getPosts = () => {
  const postsDirectory = path.join(process.cwd(), 'post');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    return parsePostFile(filePath);
  });
};
