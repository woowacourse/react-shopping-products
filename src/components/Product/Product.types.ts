import { Product } from "../../types/Product";

export interface ProductProps {
  product: Product;
  handleAddProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleRemoveProduct: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
