import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

await worker.start({
  serviceWorker: {
    url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    options: {
      scope: import.meta.env.BASE_URL,
    },
  },
});
