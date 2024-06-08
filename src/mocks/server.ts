import { setupServer } from "msw/node";

import productHandlers from "./handlers/products";
import cartHandlers from "./handlers/cart";

export const server = setupServer(...productHandlers, ...cartHandlers);
