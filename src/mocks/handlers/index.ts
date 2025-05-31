import productHandler from "./products";
import cartItemHandler from "./cartItem";

export const handlers = [...productHandler, ...cartItemHandler];
