import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

// const prepare = async () => {
//   if (process.env.NODE_ENV === 'development') {
//     const { worker } = await import('../src/mocks/browser');
//     await worker.start();
//   }
// };

// prepare().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
// });
