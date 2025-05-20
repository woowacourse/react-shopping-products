import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Skeleton from './shared/ui/Skeleton.tsx';
import LazyApp from './AppLazy.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Suspense fallback={<Skeleton />}>
    <LazyApp />
  </Suspense>
  // </React.StrictMode>
);
