'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { PostAnchorStateContext, PostAnchorActionsContext } from './post-anchor.context';

export default function PostAnchorProvider({ children }: Readonly<PropsWithChildren>) {
  const [activeAnchor, setActiveAnchor] = useState<string | undefined>(undefined);

  const state = {
    activeAnchor,
  };

  const actions = useMemo(
    () => ({
      setActiveAnchor: (anchor: string) => setActiveAnchor(anchor),
    }),
    [],
  );

  return (
    <PostAnchorActionsContext value={actions}>
      <PostAnchorStateContext value={state}>{children}</PostAnchorStateContext>
    </PostAnchorActionsContext>
  );
}
