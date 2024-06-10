import { deleteCartItem } from "../../api/cartItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryKeys";
import { useToast } from "../../stores/ToastProvider";

const useDeleteCartItem = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.cartItems] });
    },
    onError: (error) => {
      showToast(
        error.message ||
          "장바구니에서 아이템을 삭제하는 도중 에러가 발생했습니다."
      );
    },
  });
};

export default useDeleteCartItem;
