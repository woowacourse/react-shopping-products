import { CreateCartItemParams, createCartItem } from "@src/apis/cartItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MUTATION_KEYS, QUERY_KEYS } from "../__constants__/queryKeys";

interface UseCreateCartItemMutationReturn {
  createCartItemMutation: (props: CreateCartItemParams) => void;
}

export type OnError = (error: Error) => void;

export const useCreateCartItemMutation = (onError?: OnError): UseCreateCartItemMutationReturn => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation<void, Error, CreateCartItemParams>({
    mutationKey: [MUTATION_KEYS.createCartItem],
    mutationFn: createCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
    onError,
  });

  const createCartItemMutation = (params: CreateCartItemParams) => {
    mutate(params);
  };

  return {
    createCartItemMutation,
  };
};
