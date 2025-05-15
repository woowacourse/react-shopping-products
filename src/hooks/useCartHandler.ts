import { getCartId } from '../domain/manageCartInfo';
import { addCartItems, removeCartItems } from '../services/cartItemServices';
import tryApiCall from '../util/tryApiCall';

interface CartHandlerProps {
  handleAddCartItemsIds: (id: number) => void;
  handleRemoveCartItemsIds: (id: number) => void;
  handleErrorMessage: (errorMessage: string) => void;
}

const useCartHandler = ({
  handleAddCartItemsIds,
  handleRemoveCartItemsIds,
  handleErrorMessage,
}: CartHandlerProps) => {
  const handleAddCartItem = (id: number) => {
    const addItemInfo = {
      productId: id,
      quantity: 1,
    };
    (async () => {
      await tryApiCall(async () => await addCartItems(addItemInfo), handleErrorMessage);
      handleAddCartItemsIds(id);
    })();
  };

  const handleRemoveCartItem = (id: number) => {
    (async () => {
      await removeCartItems(await tryApiCall(async () => await getCartId(id), handleErrorMessage));
      handleRemoveCartItemsIds(id);
    })();
  };

  return {
    handleAddCartItem,
    handleRemoveCartItem,
  };
};

export default useCartHandler;
