import useAddCartItemQuery from './useAddCartItemQuery';
import useDeleteCartItemQuery from './useDeleteCartItemQuery';
import useFetchCartItemsQuery from './useFetchCartItemsQuery';

const useCartItems = () => {
  const { data: cartItems } = useFetchCartItemsQuery();
  const { mutate: addCartItem } = useAddCartItemQuery();
  const { mutate: deleteCartItem } = useDeleteCartItemQuery();

  const matchCartItem = (productId: number) => {
    return cartItems.find((cartItem) => cartItem.product.id === productId);
  };

  const handleAddCartItem = async (productId: number) => {
    addCartItem({ productId });
  };

  const handleDeleteCartItem = async (productId: number) => {
    const matchedCartItemInfo = matchCartItem(productId);
    const cartItemId = matchedCartItemInfo!.id;

    deleteCartItem(cartItemId);
  };

  return { cartItems, handleAddCartItem, handleDeleteCartItem, matchCartItem };
};

export default useCartItems;
