import { Product } from "../../types/Product";

export interface ProductProps {
  product: Product;
  isInCart: boolean;
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleAddProduct: (productId: string) => void;
}
