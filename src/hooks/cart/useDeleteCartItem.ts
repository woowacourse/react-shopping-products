import { fetchDeleteCartList } from '@src/apis';
import { REACT_QUERY_KEY } from '@src/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useDeleteCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteCartList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [REACT_QUERY_KEY.cartList] });
    },
    onError: (error, vairables) => {
      console.error(`${vairables.cartItemId}에 대한 장바구니 삭제 요청 실패: ${error.message}`);
    },
  });
};

export default useDeleteCartItem;
