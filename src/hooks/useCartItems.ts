import { Product } from '../App';
import getCartItems from '../api/getCartItems';
import postCartItems from '../api/postCartItems';
import deleteCartItems from '../api/deleteCartItems';
import patchCartItems from '../api/patchCartItems';
import { useDataContext } from '../components/contexts/dataContext';

const useCartItems = () => {
  const {
    data: cartItems,
    refetch: fetchCartItems,
    isLoading,
    error,
    updateError,
  } = useDataContext({
    fetcher: getCartItems,
    key: 'cartItems',
  });

  const addToCart = async (product: Product) => {
    try {
      await postCartItems(product);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  const removeFromCart = async (productId: number) => {
    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    try {
      await deleteCartItems(targetCartItem.id);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  const increaseCartItemQuantity = async (productId: number) => {
    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    const currentQuantity = targetCartItem?.quantity;

    try {
      await patchCartItems(targetCartItem.id, currentQuantity! + 1);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  const decreaseCartItemQuantity = async (productId: number) => {
    const targetCartItem = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    const currentQuantity = targetCartItem?.quantity;

    if (currentQuantity === 1) {
      removeFromCart(productId);
      return;
    }

    try {
      await patchCartItems(targetCartItem.id, currentQuantity! - 1);
      fetchCartItems();
    } catch (e) {
      updateError('cartItems', e instanceof Error ? Number(e.message) : null);
    }
  };

  return {
    cartItems,
    isLoading,
    error,
    fetchCartItems,
    addToCart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  };
};

export default useCartItems;
