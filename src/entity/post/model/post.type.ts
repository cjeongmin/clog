export interface Post {
  content: string;
  date: string;
  description?: string;
  draft: boolean;
  fileName: string;
  tags?: string[];
  thumbnail?: string;
  title: string;
}
