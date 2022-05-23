export type ToastAction = {
  action: 'new' | 'dismiss' | 'dismiss-all';
  notification?: Toast;
};

export type Toast = {
  message: string;
  type: Type;
  duration?: number;
};

export interface Type {
  type: 'success' | 'error' | 'info' | 'warning';
  icon: string;
}
