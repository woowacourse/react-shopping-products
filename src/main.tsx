import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import GlobalStyle from './GlobalStyle.tsx';
import theme from './theme.ts';
import { ToastProvider } from './components/common/toast/Toast.tsx';
import ErrorHandler from './components/error/ErrorHandler.tsx';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   return await worker.start();
// }

// enableMocking().then(() => {

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <ErrorHandler>
          <GlobalStyle />
          <App />
        </ErrorHandler>
      </ToastProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
// });
