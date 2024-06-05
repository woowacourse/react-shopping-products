import { getCartItems } from "@/apis/cartItem";
import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";
import { END_POINT } from "@/config/endPoint";
import QUERY_KEY from "@/constants/queryKey";
import TIMER from "@/constants/timer";
import { useQuery } from "@tanstack/react-query";

const CartBadge = () => {
  const { data: cartItems } = useQuery({
    queryKey: [QUERY_KEY.getCartItems],
    queryFn: getCartItems,
    gcTime: TIMER.hour,
    staleTime: TIMER.hour,
  });

  return (
    <S.Container onClick={() => (window.location.href = END_POINT.cartItemPage)}>
      <Icon kind="cart" />
      <S.Badge>
        <S.BadgeNumber>{!cartItems || cartItems.length === 0 ? 0 : cartItems.length}</S.BadgeNumber>
      </S.Badge>
    </S.Container>
  );
};

export default CartBadge;
