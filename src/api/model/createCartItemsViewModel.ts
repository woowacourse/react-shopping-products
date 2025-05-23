import { CartItem } from '../../types/cartContents';

export interface CartItemViewModel {
  id: number;
  productId: number;
  title: string;
  imageUrl: string;
  price: string;
}
const createCartItemsViewModel = (cartItems: CartItem[]): CartItemViewModel[] => {
  return cartItems?.map((item) => ({
    id: item.id,
    productId: item.product.id,
    title: item.product.name,
    imageUrl: item.product.imageUrl,
    price: `${item.product.price.toLocaleString()}원`
  }));
};

export default createCartItemsViewModel;
