import path from 'path';

import { parsePostFile } from '@/entity/post';

export const getPost = (fileName: string) => {
  const filePath = path.join(process.cwd(), 'post', `${decodeURIComponent(fileName)}.md`);
  return parsePostFile(filePath);
};
