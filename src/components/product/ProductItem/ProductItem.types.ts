import { Product } from "../../../types/Product";

export interface ProductProps {
  product: Product;
  isInCart: boolean;
  handleAddProduct: (productId: string) => void;
  handleRemoveProduct: (productId: string) => void;
}
