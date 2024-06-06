import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCartItems, deleteCartItem, addCartItem, updateCartItemQuantity } from '../../api/cart';
import { Cart } from '../../types/Cart.type';

interface UseCartItemsResult {
  cartItems: Cart[];
  isLoading: boolean;
  isError: boolean;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  handleUpdateCartItemQuantity: (productId: number, quantity: number) => void;
}

const useCartItems = (): UseCartItemsResult => {
  const queryClient = useQueryClient();

  const {
    data: cartItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: getCartItems,
  });

  const addCartItemMutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteCartItemMutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateCartItemQuantityMutation = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const handleAddCartItem = (productId: number) => addCartItemMutation.mutate(productId);

  const handleDeleteCartItem = (productId: number) => {
    if (cartItems) {
      const cartItem = cartItems.find((item) => item.product.id === productId);

      if (cartItem) {
        deleteCartItemMutation.mutate(cartItem.id);
      }
    }
  };

  const handleUpdateCartItemQuantity = (productId: number, quantity: number) => {
    if (cartItems) {
      const cartItem = cartItems.find((item) => item.product.id === productId);

      if (cartItem) {
        updateCartItemQuantityMutation.mutate({ cartItemId: cartItem.id, quantity });
      }
    }
  };

  return {
    cartItems: cartItems ?? [],
    isLoading,
    isError,
    handleAddCartItem,
    handleDeleteCartItem,
    handleUpdateCartItemQuantity,
  };
};

export default useCartItems;
