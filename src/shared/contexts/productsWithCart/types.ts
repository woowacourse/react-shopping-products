import { CartProduct, Product } from '../../../features/products/type/product';

export interface ProductsWithCartContextValue {
  products: Product[];
  cartProducts: CartProduct[];
  isLoading: boolean;
  error: string;
  fetchProducts: () => Promise<void>;
  updateCart: (newCart: { productId: number; cartProductId: number; cartProductQuantity: number }) => Promise<void>;
  sortValue: string;
  setSortValue: (value: string) => void;
}
