import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/app/App';
import '@/shared/styles/reset.css';
import '@/shared/styles/color.css';
import '@/shared/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
