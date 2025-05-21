import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Skeleton from './shared/ui/Skeleton.tsx';
import LazyApp from './AppLazy.tsx';

async function enableMocking() {
  // if (process.env.NODE_ENV !== 'development') {
  //   return;
  // }

  const { worker } = await import('./mocks/browser');
  return worker.start({ onUnhandledRequest: 'bypass' });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <Suspense fallback={<Skeleton />}>
      <LazyApp />
    </Suspense>
    // </React.StrictMode>
  );
});
