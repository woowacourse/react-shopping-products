import { CartItem } from '../../types/cartContents';

const createCartItemsViewModel = (cartItems: CartItem[] | undefined) => {
  return cartItems?.map((item) => ({
    itemId: item.id,
    productId: item.product.id,
    title: item.product.name,
    imageUrl: item.product.imageUrl,
    price: `${item.product.price.toLocaleString()}원`
  }));
};

export default createCartItemsViewModel;
