import { parsePostFile } from '@/entity/post';
import path from 'path';

export const getPost = (fileName: string) => {
  const filePath = path.join(process.cwd(), 'post', `${decodeURIComponent(fileName)}.md`);
  return parsePostFile(filePath);
};
