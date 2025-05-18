import { lazy } from 'react';

const LazyApp = lazy(() => import('./App'));

export default LazyApp;
