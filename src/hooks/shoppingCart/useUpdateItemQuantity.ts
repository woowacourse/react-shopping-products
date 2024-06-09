import usePatchItemQuantity from '@queries/shoppingCart/usePatchItemQuantity';

const useUpdateItemQuantity = (showToast: (message: string) => void) => {
  const { mutate: updateItemQuantity } = usePatchItemQuantity(showToast);

  const onIncreaseItemQuantity = ({ id, quantity }: { id: number; quantity: number }) => {
    updateItemQuantity({ id, quantity: quantity + 1 });
  };

  const onDecreaseItemQuantity = ({ id, quantity }: { id: number; quantity: number }) => {
    updateItemQuantity({ id, quantity: quantity - 1 });
  };

  return { onDecreaseItemQuantity, onIncreaseItemQuantity };
};

export default useUpdateItemQuantity;
