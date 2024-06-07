import { CreateCartItemParams, createCartItem } from "@src/apis/cartItems";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEYS } from "@server/__constants__/queryKeys";
import { queryInvalidator } from "@server/queryClient";

interface UseCreateCartItemMutationReturn {
  createCartItemMutation: (props: CreateCartItemParams) => void;
}

type OnError = (error: Error) => void;

export const useCreateCartItemMutation = (onError?: OnError): UseCreateCartItemMutationReturn => {
  const { mutate } = useMutation<void, Error, CreateCartItemParams>({
    mutationKey: [MUTATION_KEYS.createCartItem],
    mutationFn: createCartItem,
    onSuccess: queryInvalidator.cartItems,
    onError,
  });

  const createCartItemMutation = (params: CreateCartItemParams) => {
    mutate(params);
  };

  return {
    createCartItemMutation,
  };
};
