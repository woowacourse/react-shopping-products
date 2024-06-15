import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';

import App from './App.tsx';
import theme from './theme.ts';
import { globalStyles } from './globalStyle.ts';
import GlobalLayout from './layouts/GlobalLayout/index.tsx';
import { ToastProvider } from './context/ToastProvider.tsx';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   return worker.start();
// }

// enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <ToastProvider>
      <Global styles={globalStyles} />
      <GlobalLayout>
        <App />
      </GlobalLayout>
    </ToastProvider>
  </ThemeProvider>,
);
// });
