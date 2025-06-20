'use client';

import { createContext, use } from 'react';

interface PostAnchorState {
  activeAnchor?: string;
  isTocScrolling?: boolean;
}

interface PostAnchorActions {
  setActiveAnchor: (anchor: string) => void;
  setTocScrolling: (isScrolling: boolean) => void;
}

export const PostAnchorStateContext = createContext<PostAnchorState | undefined>(undefined);

export const PostAnchorActionsContext = createContext<PostAnchorActions | undefined>(undefined);

export const usePostAnchorStateContext = () => {
  const context = use(PostAnchorStateContext);
  if (!context) {
    throw new Error('usePostAnchorStateContext must be used within a PostAnchorProvider');
  }
  return context;
};

export const usePostAnchorActionsContext = () => {
  const context = use(PostAnchorActionsContext);
  if (!context) {
    throw new Error('usePostAnchorActionsContext must be used within a PostAnchorProvider');
  }
  return context;
};
