import { createRoot } from 'react-dom/client';
import ToastMessage from '../../components/common/ToastMessage';
import { createElement } from 'react';

export type ToastType = 'error' | 'info';

export function showToast(message: string, type: ToastType = 'info') {
  console.log('showToast', message, type);
  const container = document.createElement('div');
  document.body.appendChild(container);

  const root = createRoot(container);
  root.render(createElement(ToastMessage, { message, type }));

  setTimeout(() => {
    root.unmount();
    document.body.removeChild(container);
  }, 3000);
}
