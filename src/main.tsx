import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

async function enableMocking() {
  const { worker } = await import('./mocks/browser'); //Dynamic import하는 것이 눈에 띄였다.
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
