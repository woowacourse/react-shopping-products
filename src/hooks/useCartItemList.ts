import { cartMutations, cartQuery } from './queries/cart';
import { useToast } from './useToast';

const useCartItemList = () => {
  const { data: cartItemList } = cartQuery.useGetCartItemList();

  const { mutate: adjustCartItemQuantity } = cartMutations.useAdjustCartItemQuantity();
  const { mutate: deleteCartItem } = cartMutations.useDeleteCartItem();
  const { mutate: addCartItem } = cartMutations.useAddCartItem();
  const { toastError } = useToast();

  const matchCartItem = (productId: number) => {
    return cartItemList?.find((cartItem) => cartItem.product.id === productId);
  };

  const getCartItemQuantity = (productId: number) => {
    const cartItem = cartItemList?.find((cartItem) => cartItem.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleAdjustQuantity = (quantity: number, cartItemId: number) => {
    adjustCartItemQuantity({
      cartItemId: cartItemId,
      quantity: quantity,
    });
  };

  const handleDeleteCartItem = (cartId: number) => {
    deleteCartItem(cartId);
  };

  const handleAddCartItem = (productId: number) => {
    if (cartItemList.length >= 20) {
      toastError('장바구니에 더 이상 추가할 수 없습니다.');
      return;
    }
    addCartItem(productId);
  };

  const totalCartItemPrice = cartItemList?.reduce((totalPrice, cartItem) => {
    return totalPrice + cartItem.product.price * cartItem.quantity;
  }, 0);

  return {
    cartItemList,
    handleAddCartItem,
    handleDeleteCartItem,
    handleAdjustQuantity,
    matchCartItem,
    getCartItemQuantity,
    totalCartItemPrice,
  };
};

export default useCartItemList;
