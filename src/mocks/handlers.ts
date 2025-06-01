import cartItemHandler from "./handlers/cartItemHandler";
import { productListHandler } from "./handlers/productListHandler";

export const handlers = [productListHandler, ...cartItemHandler];
