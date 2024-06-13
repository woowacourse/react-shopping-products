import { useInfiniteCartItemListQuery } from '@/apis/queries/cartItem';

export const CART_ITEM_PAGE = {
  START: 0,
  SIZE: 100,
};

const useCartItemList = () => {
  const { isSuccess, data, ...rest } = useInfiniteCartItemListQuery();

  const getCartItemQuantity = (productId: number): number => {
    if (!data || !data.cartItemMap) return 0;

    const { cartItemMap } = data;
    const cartItem = cartItemMap.get(productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const getCartItemId = (productId: number): number => {
    if (!data || !data.cartItemMap) return -1;

    const { cartItemMap } = data;
    const cartItem = cartItemMap.get(productId);
    return cartItem ? cartItem.id : -1;
  };

  const getTotalQuantity = (): number => {
    if (!data || !data.cartItemMap) return -1;

    const { cartItemMap } = data;
    return cartItemMap.size;
  };

  const getTotalPrice = (): number => {
    if (!data || !data.cartItemMap) return -1;

    const { cartItemList } = data;

    return cartItemList.reduce((sum, { product, quantity }) => sum + product.price * quantity, 0);
  };

  return {
    isSuccess,
    data: data?.cartItemList,
    ...rest,
    getCartItemId,
    getCartItemQuantity,
    getTotalQuantity,
    getTotalPrice,
  };
};

export default useCartItemList;
