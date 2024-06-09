import { IProduct } from "./products";

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
}

export interface AddCartRequestPayload {
  productId: number;
  quantity: number;
}
