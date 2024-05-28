import { setupServer } from "msw/node";
import { productsHandler } from "./handler/productsHandler";

export const server = setupServer(...productsHandler);
