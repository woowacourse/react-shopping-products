import { productHandlers } from "./productHandlers";
import { createCartHandlers } from "./cartHandlers";

const { cartHandlers, resetCartItems } = createCartHandlers();
export { resetCartItems };
export const handlers = [...productHandlers, ...cartHandlers];
