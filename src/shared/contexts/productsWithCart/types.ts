import { CartProduct, ProductDTO } from '../../../features/products/type/product';

export interface Product extends ProductDTO {
  isCart: boolean;
  cartProductQuantity?: number;
  cartProductId?: number;
}

export interface ProductsWithCartContextValue {
  products: Product[];
  cartProducts: CartProduct[];
  isLoading: boolean;
  error: string;
  setError: (error: string) => void;
  fetchProducts: () => Promise<void>;
  updateCart: (newCart: { productId: number; cartProductId: number; cartProductQuantity: number }) => Promise<void>;
  removeFromCart: (cartProductId: number, productId: number) => Promise<void>;
  sortValue: string;
  setSortValue: (value: string) => void;
  selectedProductIds: number[];
  toggleCartSelection: (productId: number) => void;
}
