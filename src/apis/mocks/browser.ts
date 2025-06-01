import { setupWorker } from "msw/browser";
import { productsHandlers } from "./productsData/productsHandler";
import { cartItemsHandlers } from "./cartItemsData/cartItemsHandler";

export const worker = setupWorker(...productsHandlers, ...cartItemsHandlers);
