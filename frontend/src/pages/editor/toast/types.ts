export type ToastType = 'loading' | 'success' | 'error' | 'retry';

export interface EditorToast {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
  createdAt: number;
}

export interface DemoAction {
  label: string;
  action: () => void;
}
