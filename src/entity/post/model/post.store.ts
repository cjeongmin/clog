import { create } from 'zustand';
import { Post } from './post.type';

interface PostState {
  posts: Post[];
  query: string;
  setPosts: (posts: Post[]) => void;
  setQuery: (query: string) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  posts: [],
  query: '',
  setPosts: (posts) => set({ posts }),
  setQuery: (query) => set({ query }),
}));
