import { create } from 'zustand';

interface PostAnchorState {
  activeAnchor?: string;
  setActiveAnchor: (anchor: string) => void;
}

export const usePostAnchorStore = create<PostAnchorState>((set) => ({
  activeAnchor: undefined,
  setActiveAnchor: (anchor) => set({ activeAnchor: anchor }),
}));
