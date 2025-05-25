import {
  addCartItems,
  removeCartItems,
  updateCartItemQuantity,
} from '../services/cartItemServices';
import tryApiCall from '../util/tryApiCall';
import type { CartItemType } from '../types/data';
import type { DataResourceType } from '../types/data';

interface UseCartItemsProps {
  dataResource: DataResourceType<CartItemType[]>;
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartItems = ({ dataResource, handleErrorMessage }: UseCartItemsProps) => {
  const handleAddCartItems = async (productId: number) => {
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

  const handleRemoveCartItems = async (productId: number) => {
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

  const handleUpdateCartItems = async (productId: number, quantity: number) => {
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

  return { handleAddCartItems, handleRemoveCartItems, handleUpdateCartItems };
};

export default useCartItems;
