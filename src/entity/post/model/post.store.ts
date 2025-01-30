import { create } from 'zustand';
import { Post } from './post.type';

interface PostState {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
}

export const usePostStore = create<PostState>()((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
}));
