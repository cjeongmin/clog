'use client';

import { createContext, useContext } from 'react';

interface PostAnchorState {
  activeAnchor?: string;
}

interface PostAnchorActions {
  setActiveAnchor: (anchor: string) => void;
}

export const postAnchorStateContext = createContext<PostAnchorState | undefined>(undefined);

export const postAnchorActionsContext = createContext<PostAnchorActions | undefined>(undefined);

export const usePostAnchorStateContext = () => {
  const context = useContext(postAnchorStateContext);
  if (!context) {
    throw new Error('usePostAnchorStateContext must be used within a PostAnchorProvider');
  }
  return context;
};

export const usePostAnchorActionsContext = () => {
  const context = useContext(postAnchorActionsContext);
  if (!context) {
    throw new Error('usePostAnchorActionsContext must be used within a PostAnchorProvider');
  }
  return context;
};
