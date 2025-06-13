'use client';

import { PropsWithChildren, useMemo, useState } from 'react';

import { AlertStateContext, AlertActionsContext, Alert } from './alert.context';

export default function AlertProvider({ children }: PropsWithChildren) {
  const [alert, setAlert] = useState<Alert | null>(null);

  const actions = useMemo(
    () => ({
      showAlert: (newAlert: Alert) => setAlert(newAlert),
      hideAlert: () => setAlert(null),
    }),
    [],
  );

  const state = { alert };

  return (
    <AlertActionsContext value={actions}>
      <AlertStateContext value={state}>{children}</AlertStateContext>
    </AlertActionsContext>
  );
}
