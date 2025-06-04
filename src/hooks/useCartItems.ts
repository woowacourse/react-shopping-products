import { useEffect } from 'react';
import { CartItem, Product } from '../App';
import getCartItems from '../api/getCartItems';
import postCartItems from '../api/postCartItems';
import deleteCartItems from '../api/deleteCartItems';
import patchCartItems from '../api/patchCartItems';
import { useDataContext } from '../components/contexts/dataContext';
import useApiRequest from './useApiRequest';

const key = 'cartItems';

const useCartItems = () => {
  const { data: contextData, setData } = useDataContext();

  const {
    data: fetchedCartItems,
    isLoading,
    error: fetchError,
    request: fetchCartItems,
  } = useApiRequest<void, CartItem>({
    method: 'GET',
    requestFn: getCartItems,
    enabled: !contextData[key],
  });

  const {
    request: postCartItemRequest,
    isLoading: isPosting,
    error: postError,
  } = useApiRequest<Product>({
    method: 'POST',
    requestFn: postCartItems,
    enabled: false,
  });

  const {
    request: patchCartItemRequest,
    isLoading: isPatching,
    error: patchError,
  } = useApiRequest<{ cartItemId: number; quantity: number }>({
    method: 'PATCH',
    requestFn: patchCartItems,
    enabled: false,
  });

  const {
    request: deleteCartItemRequest,
    isLoading: isDeleting,
    error: deleteError,
  } = useApiRequest<number>({
    method: 'DELETE',
    requestFn: deleteCartItems,
    enabled: false,
  });

  const totalError = {
    isError: Boolean(
      postError?.isError ||
        patchError?.isError ||
        deleteError?.isError ||
        fetchError?.isError
    ),
    status:
      postError?.status ||
      patchError?.status ||
      deleteError?.status ||
      fetchError?.status ||
      null,
  };
  console.log('fetchError', fetchError);
  console.log('postError', postError);
  console.log('patchError', patchError);
  console.log('deleteError', deleteError);
  console.log('에러!?', totalError);
  const cartItems = contextData[key]?.data ?? [];

  useEffect(() => {
    if (fetchedCartItems) {
      setData((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          data: fetchedCartItems,
        },
      }));
    }
  }, [fetchedCartItems, key, setData]);

  const addToCart = async (product: Product) => {
    if (isPosting) return;

    await postCartItemRequest(product);
    fetchCartItems();
  };

  const removeFromCart = async (productId: number) => {
    if (isDeleting) return;

    const target = cartItems.find((item) => item.product.id === productId);

    await deleteCartItemRequest(target.id);
    fetchCartItems();
  };

  const increaseCartItemQuantity = async (productId: number) => {
    if (isPatching) return;

    const target = cartItems.find((item) => item.product.id === productId);
    if (!target) {
      return;
    }

    await patchCartItemRequest({
      cartItemId: target.id,
      quantity: target.quantity + 1,
    });
    fetchCartItems();
  };

  const decreaseCartItemQuantity = async (productId: number) => {
    if (isPatching) return;

    const target = cartItems.find((item) => item.product.id === productId);
    if (!target) {
      return;
    }

    if (target.quantity === 1) {
      await removeFromCart(productId);
      return;
    }

    await patchCartItemRequest({
      cartItemId: target.id,
      quantity: target.quantity - 1,
    });
    fetchCartItems();
  };

  return {
    cartItems,
    isLoading,
    error: totalError,
    fetchCartItems,
    addToCart,
    removeFromCart,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
  };
};

export default useCartItems;
