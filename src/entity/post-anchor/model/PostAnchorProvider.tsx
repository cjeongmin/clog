'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { PostAnchorStateContext, PostAnchorActionsContext } from './post-anchor.context';

export default function PostAnchorProvider({ children }: Readonly<PropsWithChildren>) {
  const [activeAnchor, setActiveAnchor] = useState<string | undefined>(undefined);

  const state = useMemo(
    () => ({
      activeAnchor,
    }),
    [activeAnchor],
  );

  const actions = useMemo(
    () => ({
      setActiveAnchor: (anchor: string) => setActiveAnchor(anchor),
    }),
    [],
  );

  return (
    <PostAnchorStateContext value={state}>
      <PostAnchorActionsContext value={actions}>{children}</PostAnchorActionsContext>
    </PostAnchorStateContext>
  );
}
