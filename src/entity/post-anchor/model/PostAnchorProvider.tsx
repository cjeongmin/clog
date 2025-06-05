'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { postAnchorStateContext, postAnchorActionsContext } from './post-anchor.context';

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
    <postAnchorStateContext.Provider value={state}>
      <postAnchorActionsContext.Provider value={actions}>{children}</postAnchorActionsContext.Provider>
    </postAnchorStateContext.Provider>
  );
}
