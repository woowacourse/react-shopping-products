import { useEffect, useState } from 'react';

import { useAddToCartListQuery } from './cart/useAddToCartListQuery';
import useChangeItemQuantity from './cart/useChangeItemQuantity';
import { useDeleteFromCartListQuery } from './cart/useDeleteFromCartListQuery';
import useGetCartListQuery from './cart/useGetCartListQuery';

const useProductSelector = (productId: number) => {
  const { data: cartList } = useGetCartListQuery();

  const { mutate: addCartItem } = useAddToCartListQuery();
  const { mutate: deleteCartItem } = useDeleteFromCartListQuery();
  const { mutate: changeQuantity } = useChangeItemQuantity();

  const [cartItemId, setCartId] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const cartItem = cartList?.find((item) => item.product.id === productId);

    if (cartItem) {
      setCartId(cartItem.id);
      setQuantity(cartItem.quantity);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [cartList, productId]);

  const handleAddCartItem = () => {
    addCartItem(productId, {
      onSuccess: () => {
        setIsSelected(true);
        setQuantity(1);
      },
      onError: (error) => {
        setError(error);
      },
    });
  };

  const handleDeleteCartItem = () => {
    deleteCartItem(cartItemId, {
      onSuccess: () => {
        setIsSelected(false);
        setQuantity(0);
      },
      onError: (error) => {
        setError(error);
      },
    });
  };

  const handleChangeQuantity = (quantity: number) => {
    changeQuantity(
      {
        cartItemId,
        quantity,
      },
      {
        onSuccess: () => {
          setIsSelected(true);
          setQuantity(quantity);
        },
        onError: (error) => {
          setError(error);
        },
      }
    );
  };

  return {
    isSelected,
    quantity,
    error,
    handleAddCartItem,
    handleDeleteCartItem,
    handleChangeQuantity,
  };
};

export default useProductSelector;
