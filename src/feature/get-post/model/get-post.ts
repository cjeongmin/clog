import path from 'path';

import { parsePostFile } from '@/entity/post';

export const getPost = (fileName: string) => {
  try {
    const filePath = path.join(process.cwd(), 'post', `${decodeURIComponent(fileName)}.md`);
    const result = parsePostFile(filePath);
    if (result.draft) throw new Error('Draft post is not allowed to be fetched');
    return result;
  } catch {
    throw new Error('Post not found');
  }
};
