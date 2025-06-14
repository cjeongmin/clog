'use client';

import { createContext, use } from 'react';

type AlertType = 'info' | 'confirm';

export interface Alert {
  type: AlertType;
  message: string;
  confirm?: () => void;
  cancel?: () => void;
}

interface AlertState {
  alert: Alert | null;
}

interface AlertActions {
  showAlert: (alert: Alert) => void;
  hideAlert: () => void;
}

export const AlertStateContext = createContext<AlertState | undefined>(undefined);

export const AlertActionsContext = createContext<AlertActions | undefined>(undefined);

export const useAlertStateContext = () => {
  const context = use(AlertStateContext);
  if (!context) {
    throw new Error('useAlertStateContext must be used within an AlertProvider');
  }
  return context;
};

export const useAlertActionsContext = () => {
  const context = use(AlertActionsContext);
  if (!context) {
    throw new Error('useAlertActionsContext must be used within an AlertProvider');
  }
  return context;
};
