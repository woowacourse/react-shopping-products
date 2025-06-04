import { CartItem } from '../../types/cartContents';

export interface CartItemModel {
  id: number;
  productId: number;
  title: string;
  imageUrl: string;
  price: string;
  cartQuantity: number;
  productQuantity: number;
}

export const cartItemMapper = (item: CartItem): CartItemModel => {
  return {
    id: item.id,
    productId: item.product.id,
    title: item.product.name,
    imageUrl: item.product.imageUrl,
    price: `${item.product.price.toLocaleString()}원`,
    cartQuantity: item.quantity,
    productQuantity: item.product.quantity
  };
};
