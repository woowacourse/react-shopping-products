import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// @ts-expect-error - MSW v2 타입 호환성 문제
export const worker = setupWorker(...handlers);
