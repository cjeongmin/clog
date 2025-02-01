import { create } from 'zustand';

type AlertType = 'info' | 'confirm';

interface Alert {
  type: AlertType;
  message: string;
  confirm?: () => void;
  cancel?: () => void;
}

interface AlertStore {
  alert: Alert | null;
  show: (alert: Alert) => void;
  hide: () => void;
}

export const useAlertStore = create<AlertStore>()((set) => ({
  alert: null,
  show: (alert) => set({ alert }),
  hide: () => set({ alert: null }),
}));
