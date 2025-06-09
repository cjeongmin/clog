import path from 'path';

import { parsePostFile } from '@/entity/post';

export const getPost = (fileName: string) => {
  try {
    const filePath = path.join(process.cwd(), 'post', `${decodeURIComponent(fileName)}.mdx`);
    const result = parsePostFile(filePath);
    return result;
  } catch {
    throw new Error('Post not found');
  }
};

export const getPostMDX = async (fileName: string) => {
  const { default: Post } = await import(`@/../post/${decodeURIComponent(fileName)}.mdx`);
  return Post;
};
