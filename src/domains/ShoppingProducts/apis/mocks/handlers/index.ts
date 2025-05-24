import { productHandlers } from "./productHandlers";
import { cartHandlers } from "./cartHandlers";

export const handlers = [...productHandlers, ...cartHandlers];
