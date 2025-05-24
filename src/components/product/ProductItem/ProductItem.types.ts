import { Product } from "../../../types/Product";

export interface ProductProps {
  product: Product;
  isInCart: boolean;
  quantity: number;
  handleAddProduct: (productId: number) => void;
  handleIncreaseCartItemQuantity: (productId: number) => void;
  handleDecreaseCartItemQuantity: (productId: number) => void;
}
