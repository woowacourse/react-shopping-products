import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Skeleton from './shared/ui/Skeleton.tsx';

const LazyApp = lazy(() => import('./App.tsx'));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<Skeleton />}>
      <LazyApp />
    </Suspense>
  </React.StrictMode>
);
