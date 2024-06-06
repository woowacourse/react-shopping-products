import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCartItems, deleteCartItem, addCartItem } from '../../api/cart';
import { CartItem } from '../../types/CartItem.type';
import { SIZE } from '../../constants/api';
import { ToastContext } from '../../context/ToastProvider';
import { QUERY_KEYS } from '../../api/queryKeys';

interface UseCartItemsResult {
  cartItems: CartItem[];
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
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

  const handleAddCartItem = (productId: number) => {
    addMutation.mutate(productId);
  };

  const handleDeleteCartItem = (productId: number) => {
    const cartItem = cartItems.find((item) => item.product.id === productId);
    if (!cartItem) return;
    deleteMutation.mutate(cartItem.id);
  };

  return {
    cartItems,
    handleAddCartItem,
    handleDeleteCartItem,
  };
};

export default useCartItems;
