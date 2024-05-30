import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import ToastProvider from '@components/common/Toast/provider/ToastProvider.tsx';
import { SIZE } from '@styles/style.constant.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <div
    style={{
      width: SIZE.layoutWidth,
      margin: 'auto',
    }}
  >
    <ToastProvider>
      <App />
    </ToastProvider>
  </div>
);
