import { getCartItems } from "@/apis/cartItem";
import Icon from "@/components/_common/Icon";
import * as S from "@/components/CartBadge/style";
import ShoppingBasket from "@/components/ShoppingBasket";
import { END_POINT } from "@/config/endPoint";
import QUERY_KEY from "@/constants/queryKey";
import TIMER from "@/constants/timer";
import { useQuery } from "@tanstack/react-query";
import { MouseEventHandler, useState } from "react";
import { CustomModal } from "woowacourse-todari-components";

const CartBadge = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: cartItems } = useQuery({
    queryKey: [QUERY_KEY.getCartItems],
    queryFn: getCartItems,
    gcTime: TIMER.hour,
    staleTime: TIMER.hour,
  });

  const openItemModal: MouseEventHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <CustomModal
        isOpened={isModalOpen}
        modalPosition="bottom"
        onClose={() => setIsModalOpen(false)}
        title="장바구니"
        primaryButton={{ text: "다음", onClick: () => (window.location.href = END_POINT.cartItemPage) }}
        secondaryButton={{ text: "닫기", onClick: () => setIsModalOpen(false) }}
      >
        <ShoppingBasket />
      </CustomModal>
      <S.Container onClick={openItemModal}>
        <Icon kind="cart" />
        <S.Badge>
          <S.BadgeNumber>{!cartItems || cartItems.length === 0 ? 0 : cartItems.length}</S.BadgeNumber>
        </S.Badge>
      </S.Container>
    </>
  );
};

export default CartBadge;
