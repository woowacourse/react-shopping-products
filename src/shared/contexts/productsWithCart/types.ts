import { Product } from '../../../features/products/type/product';

export interface ProductsWithCartContextValue {
  products: Product[];
  isLoading: boolean;
  error: string;
  fetchProducts: () => Promise<void>;
  sortValue: string;
  setSortValue: (value: string) => void;
}
