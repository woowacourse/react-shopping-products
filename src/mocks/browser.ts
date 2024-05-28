import { setupWorker } from "msw/browser";
import { productsHandler } from "./handler/productsHandler";

export const worker = setupWorker(...productsHandler);
