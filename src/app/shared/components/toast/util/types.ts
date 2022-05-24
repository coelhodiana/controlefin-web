import { Type } from '../model/toast';

type TypeKey = {
  [key: string]: Type;
};

export const TypeList: TypeKey = {
  success: {
    type: 'success',
    icon: 'bi bi-check-lg',
  },
  error: {
    type: 'error',
    icon: 'bi bi-x-lg',
  },
  info: {
    type: 'info',
    icon: 'bi bi-info-lg',
  },
  warning: {
    type: 'warning',
    icon: 'bi bi-exclamation-triangle',
  },
};
