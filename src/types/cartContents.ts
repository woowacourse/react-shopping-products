import { ProductWithQuantity } from "./product";
export interface CartItem {
  id: number;
  quantity: number;
  product: ProductWithQuantity;
}
