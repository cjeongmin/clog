'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { PostAnchorStateContext, PostAnchorActionsContext } from './post-anchor.context';

export default function PostAnchorProvider({ children }: Readonly<PropsWithChildren>) {
  const [activeAnchor, setActiveAnchor] = useState<string | undefined>(undefined);
  const [isTocScrolling, setIsTocScrolling] = useState(false);

  const state = {
    activeAnchor,
    isTocScrolling,
  };

  const actions = useMemo(
    () => ({
      setActiveAnchor: (anchor: string) => setActiveAnchor(anchor),
      setTocScrolling: (isScrolling: boolean) => setIsTocScrolling(isScrolling),
    }),
    [],
  );

  return (
    <PostAnchorActionsContext value={actions}>
      <PostAnchorStateContext value={state}>{children}</PostAnchorStateContext>
    </PostAnchorActionsContext>
  );
}
