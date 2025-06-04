import { setupWorker } from 'msw/browser';
import { productHandlers } from './handlers/product';
import { cartHandlers } from './handlers/cart';

// 모든 핸들러를 하나의 배열로 결합
const handlers = [...productHandlers, ...cartHandlers];

export const worker = setupWorker(...handlers);
