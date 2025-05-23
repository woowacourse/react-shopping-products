import { CartItem } from '../../types/cartContents';
import { Product } from '../../types/product';

interface createProductListViewModelParams {
  products?: Product[];
  cartItems?: CartItem[];
}

export interface ProductCardViewModel {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  cartItemId?: number;
}

export function createProductListViewModel({
  products,
  cartItems
}: createProductListViewModelParams): ProductCardViewModel[] {
  if (!products) return [];

  return products.map((product) => {
    const matchedCart = cartItems?.find((item) => item.product.id === product.id);
    return {
      id: product.id,
      title: product.name,
      price: `${product.price.toLocaleString()}원`,
      imageUrl: product.imageUrl,
      isInCart: !!matchedCart,
      cartItemId: matchedCart?.id
    };
  });
}
