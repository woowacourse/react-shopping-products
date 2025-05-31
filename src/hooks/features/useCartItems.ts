import {
  addCartItems,
  removeCartItems,
  updateCartItemQuantity,
} from '../../services/cartItemServices';
import tryApiCall from '../../util/tryApiCall';
import type { CartItemType } from '../../types/data';
import type { DataResourceType } from '../../types/data';
import { useEffect } from 'react';

interface UseCartItemsProps {
  dataResource: DataResourceType<CartItemType[]>;
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartItems = ({ dataResource, handleErrorMessage }: UseCartItemsProps) => {
  useEffect(() => {
    if (dataResource.error) {
      handleErrorMessage(dataResource.error.message);
    }
  }, [dataResource.error]);

  const handleAddCartItem = async (productId: number) => {
    const addCartItemInfo = {
      productId: productId,
      quantity: 1,
    };
    await tryApiCall(async () => await addCartItems(addCartItemInfo), handleErrorMessage);
    await dataResource.refetch();

    if (dataResource.error) {
      handleErrorMessage(dataResource.error.message);
    }
  };

  const handleRemoveCartItem = async (productId: number) => {
    const removeItemCartId = dataResource.data?.find(
      (cartItem) => cartItem.product.id === productId,
    )?.id;

    if (removeItemCartId) {
      await tryApiCall(async () => await removeCartItems(removeItemCartId), handleErrorMessage);

      await dataResource.refetch();
      if (dataResource.error) {
        handleErrorMessage(dataResource.error.message);
      }
    }
  };

  const handleUpdateCartItem = async (productId: number, quantity: number) => {
    const updateCartItemInfo = {
      quantity: quantity,
    };
    await tryApiCall(
      async () => await updateCartItemQuantity(productId, updateCartItemInfo),
      handleErrorMessage,
    );

    await dataResource.refetch();
    if (dataResource.error) {
      handleErrorMessage(dataResource.error.message);
    }
  };

  return { handleAddCartItem, handleRemoveCartItem, handleUpdateCartItem };
};

export default useCartItems;
