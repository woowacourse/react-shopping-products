import { getCartItems } from "@api/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useCartItems = () => {
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const refetchCartItems = () => {
    queryClient.invalidateQueries({ queryKey: ["cartItems"] });
  };

  return {
    cartItems: data ?? [],
    error,
    refetchCartItems,
  };
};

export default useCartItems;
