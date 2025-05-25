import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// @ts-ignore - MSW v2 타입 호환성 문제
export const worker = setupWorker(...handlers);
