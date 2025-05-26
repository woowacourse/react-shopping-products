import { CartItem } from '../../types/cartContents';

export interface CartItemViewModel {
  id: number;
  productId: number;
  title: string;
  imageUrl: string;
  price: string;
  cartQuantity: number; // 장바구니에 담긴 수량
  productQuantity: number; // 상품의 재고 수량
}

const createCartItemsViewModel = (cartItems: CartItem[]): CartItemViewModel[] => {
  return cartItems?.map((item) => ({
    id: item.id,
    productId: item.product.id,
    title: item.product.name,
    imageUrl: item.product.imageUrl,
    price: `${item.product.price.toLocaleString()}원`,
    cartQuantity: item.quantity,
    productQuantity: item.product.quantity
  }));
};

export default createCartItemsViewModel;
