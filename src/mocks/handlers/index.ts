import { default as productHandlers } from './products';
import { default as cartHandlers } from './cart';

const handlers = [...productHandlers, ...cartHandlers];

export default handlers;
