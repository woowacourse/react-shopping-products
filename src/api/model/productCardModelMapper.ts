import { CartItem } from '../../types/cartContents';
import { Product } from '../../types/product';

export interface ProductCardModel {
  id: number;
  title: string;
  price: string;
  imageUrl: string;
  isInCart: boolean;
  cartItemId?: number;
  cartQuantity: number;
  productQuantity: number;
}
export function productCardModelMapper(product: Product, cartItems?: CartItem[] | undefined): ProductCardModel {
  const matchedCart = cartItems?.find((item) => item.product.id === product.id);

  return {
    id: product.id,
    title: product.name,
    price: `${product.price.toLocaleString()}원`,
    imageUrl: product.imageUrl,
    isInCart: !!matchedCart,
    cartItemId: matchedCart?.id,
    cartQuantity: matchedCart?.quantity ?? 0,
    productQuantity: product.quantity
  };
}
