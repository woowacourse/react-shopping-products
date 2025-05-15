import { Product } from "../../types/Product";

export interface ProductProps {
  product: Product;
  isInCart: boolean;
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
