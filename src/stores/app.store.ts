import { create } from "zustand";

type StateApp = {
  toast: {
    type: 'success' | 'danger' | 'primary' | null;
    show: boolean;
    message: string | null;
  };
  modal: {
    show: boolean;
    body: React.ReactNode;
    size: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen';
  };
  initApp: () => void;
};

export const useAppStore = create<StateApp>()(
  (set) => ({
    toast: {
      type: null,
      show: false,
      message: null,
    },
    modal: {
      show: false,
      body: null,
      size: 'md',
    },
    initApp: () => set(() => ({ toast: { type: null, show: false, message: null }, modal: { show: false, body: null, size: 'md' } })),
  })
);

const showToast = (type: 'success' | 'danger' | 'primary', message: string) => {
  useAppStore.setState({
    toast: {
      type,
      message,
      show: true,
    },
  });

  setTimeout(() => {
    close.toast();
  }, 4000);
};

const showModal = (body: React.ReactNode, size?: 'sm' | 'md' | 'lg' | 'xl' | 'fullscreen') => {
  useAppStore.setState({
    modal: {
      show: true,
      body: body,
      size: size || 'md',
    }
  });
};

export const toast = {
  primary: (message: string) => showToast('primary', message),
  success: (message: string) => showToast('success', message),
  danger: (message: string) => showToast('danger', message),
};
export const modal = {
  sm: (body: React.ReactNode) => showModal(body, 'sm'),
  md: (body: React.ReactNode) => showModal(body, 'md'),
  lg: (body: React.ReactNode) => showModal(body, 'lg'),
  xl: (body: React.ReactNode) => showModal(body, 'xl'),
  fullscreen: (body: React.ReactNode) => showModal(body, 'fullscreen'),
};
export const close = {
  toast: () => useAppStore.setState({ toast: { type: null, show: false, message: null } }),
  modal: () => useAppStore.setState({ modal: { show: false, body: null, size: 'md' } }),
};
