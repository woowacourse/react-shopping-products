import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCartItems, deleteCartItem, addCartItem } from '../../api/cart';
import { Cart } from '../../types/Cart.type';
import { SIZE } from '../../constants/api';

interface UseCartItemsResult {
  cartItems: Cart[];
  isLoading: boolean;
  isError: boolean;
  handleAddCartItem: (productId: number) => void;
  handleDeleteCartItem: (productId: number) => void;
}

const useCartItems = (): UseCartItemsResult => {
  const queryClient = useQueryClient();

  const getCartItems = async () => {
    const { data: initialData, totalElements } = await fetchCartItems();

    if (totalElements <= SIZE.DEFAULT) {
      return initialData;
    }

    const { data: totalData } = await fetchCartItems(totalElements);
    return totalData;
  };

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

  const handleAddCartItem = (productId: number) => addCartItemMutation.mutate(productId);

  const handleDeleteCartItem = (productId: number) => {
    if (cartItems) {
      const cartItem = cartItems.find((item) => item.product.id === productId);

      if (cartItem) {
        deleteCartItemMutation.mutate(cartItem.id);
      }
    }
  };

  return {
    cartItems: cartItems ?? [],
    isLoading,
    isError,
    handleAddCartItem,
    handleDeleteCartItem,
  };
};

export default useCartItems;
