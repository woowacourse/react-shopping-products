import { CreateCartItemParams, createCartItem } from "@src/apis/cartItems";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "./__constants__/queryKeys";
import { queryClient } from "@server/queryClient";

interface UseCreateCartItemMutationReturn {
  createCartItemMutation: (props: CreateCartItemParams) => void;
}

type OnError = (error: Error) => void;

export const useCreateCartItemMutation = (onError?: OnError): UseCreateCartItemMutationReturn => {
  const invalidateCartItems = () => {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
  };

  const { mutate } = useMutation<void, Error, CreateCartItemParams>({
    mutationKey: [MUTATION_KEYS.createCartItem],
    mutationFn: createCartItem,
    onSuccess: invalidateCartItems,
    onError,
  });

  const createCartItemMutation = (params: CreateCartItemParams) => {
    mutate(params);
  };

  return {
    createCartItemMutation,
  };
};
