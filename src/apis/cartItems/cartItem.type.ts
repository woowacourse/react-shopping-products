import { ProductItemType } from "../products/product.type";

export interface CartItemType {
  id: number;
  quantity: number;
  product: ProductItemType;
}

export interface AddCartItems {
  productId: number;
  quantity: number;
}
