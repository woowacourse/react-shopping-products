import { setupServer } from "msw/node";
import { productsHandler } from "./productsHandler";
import { cartItemsHandler } from "./cartItemsHandler";

export const server = setupServer(...productsHandler, ...cartItemsHandler);
