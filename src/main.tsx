import ReactDOM from 'react-dom/client';
import { Global, ThemeProvider } from '@emotion/react';

import App from './App.tsx';
import theme from './theme.ts';
import { globalStyles } from './globalStyle.ts';

// async function enableMocking() {
//   if (process.env.NODE_ENV !== 'development') {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   // `worker.start()` returns a Promise that resolves
//   // once the Service Worker is up and ready to intercept requests.
//   return worker.start();
// }

// enableMocking().then(() => {

// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <Global styles={globalStyles} />
    <App />
  </ThemeProvider>,
);
