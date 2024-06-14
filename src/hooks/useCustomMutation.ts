import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { ToastContext } from "../components/Toasts/ToastProvider";
import useCustomContext from "./useCustomContext";

interface Props<TData, TVariables> {
  mutationFn: MutationFunction<TData, TVariables>;
  queryKey: string[];
}

const useCustomMutation = <TData, TVariables>({
  mutationFn,
  queryKey,
}: Props<TData, TVariables>) => {
  const queryClient = useQueryClient();
  const { failAlert } = useCustomContext(ToastContext);

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      failAlert(error.message);
    },
  });
};

export default useCustomMutation;
