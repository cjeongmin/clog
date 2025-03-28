'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { alertStateContext, alertActionsContext, Alert } from './alert.context';

export default function AlertProvider({ children }: PropsWithChildren) {
  const [alert, setAlert] = useState<Alert | null>(null);

  const actions = useMemo(
    () => ({
      showAlert: (newAlert: Alert) => setAlert(newAlert),
      hideAlert: () => setAlert(null),
    }),
    [],
  );

  const state = useMemo(() => ({ alert }), [alert]);

  return (
    <alertStateContext.Provider value={state}>
      <alertActionsContext.Provider value={actions}>{children}</alertActionsContext.Provider>
    </alertStateContext.Provider>
  );
}
