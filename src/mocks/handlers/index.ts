import { cartHandler } from "./cartHandler";
import { productHandler } from "./productHandler";

export const handlers = [...cartHandler, ...productHandler];
