import { useInfiniteCartItemListQuery } from '@/apis/queries/cartItem';

export const CART_ITEM_PAGE = {
  START: 0,
  SIZE: 100,
};

const useCartItemList = () => {
  const { isSuccess, data: cartItemMap, ...rest } = useInfiniteCartItemListQuery();

  const getCartItemQuantity = (productId: number): number => {
    if (!cartItemMap) return 0;

    const cartItem = cartItemMap.get(productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartItemId = (productId: number): number => {
    if (!cartItemMap) return -1;

    const cartItem = cartItemMap.get(productId);
    return cartItem ? cartItem.id : -1;
  };

  const getTotalQuantity = (): number => {
    if (!cartItemMap) return -1;

    return cartItemMap.size;
  };

  const getTotalPrice = (): number => {
    if (!cartItemMap) return -1;

    const cartItemList = [...cartItemMap.values()];
    return cartItemList.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  };

  return {
    isSuccess,
    data: cartItemMap ? [...cartItemMap.values()] : undefined,
    ...rest,
    getCartItemId,
    getCartItemQuantity,
    getTotalQuantity,
    getTotalPrice,
  };
};

export default useCartItemList;
