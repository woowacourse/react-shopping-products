import { cartHandler } from "./handlers/cartHandler";
import { productHandler } from "./handlers/productHandler";

export const handlers = [...productHandler, ...cartHandler];
