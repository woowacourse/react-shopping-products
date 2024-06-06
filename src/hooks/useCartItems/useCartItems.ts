import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCartItems, deleteCartItem, addCartItem, updateCartItemQuantity } from '../../api/cart';
import { CartItem } from '../../types/CartItem.type';
import { SIZE } from '../../constants/api';
import { ToastContext } from '../../context/ToastProvider';
import { QUERY_KEYS } from '../../api/queryKeys';

interface UseCartItemsResult {
  cartItems: CartItem[];
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
  handleCartItemQuantity: (productId: number, quantity: number) => void;
}

const useCartItems = (): UseCartItemsResult => {
  const { showToast } = useContext(ToastContext);
  const queryClient = useQueryClient();

  const inValidateCart = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.CART] });
  };

  const { data: cartItems = [], error } = useQuery<CartItem[], Error>({
    queryKey: [QUERY_KEYS.CART],
    queryFn: async () => {
      const { data: initialData, totalElements } = await fetchCartItems(SIZE.DEFAULT);
      if (totalElements <= SIZE.DEFAULT) {
        return initialData;
      }
      const { data: totalData } = await fetchCartItems(totalElements);
      return totalData;
    },
  });

  if (error) showToast(error.message);

  const addMutation = useMutation({
    mutationFn: (productId: number) => addCartItem(productId),
    onSuccess: inValidateCart,
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (cartItemId: number) => deleteCartItem(cartItemId),
    onSuccess: inValidateCart,
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ cartItemId, quantity }: { cartItemId: number; quantity: number }) =>
      updateCartItemQuantity(cartItemId, quantity),
    onSuccess: inValidateCart,
    onError: (error: Error) => {
      showToast(error.message);
    },
  });

  const handleAddCartItem = (productId: number) => {
    addMutation.mutate(productId);
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    deleteMutation.mutate(cartItemId);
  };

  const handleCartItemQuantity = (cartItemId: number, quantity: number) => {
    updateMutation.mutate({ cartItemId, quantity });
  };

  return {
    cartItems,
    handleAddCartItem,
    handleDeleteCartItem,
    handleCartItemQuantity,
  };
};

export default useCartItems;
