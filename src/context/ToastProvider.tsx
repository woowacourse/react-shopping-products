import { useReducer, ReactNode, useCallback } from 'react';
import { ToastContext } from './ToastContext';
import { ToastType, ToastvariantType } from '../components/common/Toast/Toast';
import Toast from '../components/common/Toast/Toast';

type Action = { type: 'ADD'; toast: ToastType } | { type: 'REMOVE'; id: number };

function reducer(state: ToastType[], action: Action): ToastType[] {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'REMOVE':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const showToast = useCallback(
    ({ text, variant }: { text: string; variant: ToastvariantType }) => {
      const id = Date.now();
      dispatch({ type: 'ADD', toast: { id, text, variant } });
      setTimeout(() => dispatch({ type: 'REMOVE', id }), 3000);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map((toast) => (
        <Toast key={toast.id} text={toast.text} variant={toast.variant} />
      ))}
    </ToastContext.Provider>
  );
}
