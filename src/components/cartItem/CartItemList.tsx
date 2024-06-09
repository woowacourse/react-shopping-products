import CartItemCard from '@/components/cartItem/CartItemCard';
import { CartItem } from '@/types/cartItem.type';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

interface Props {
  cartItems: CartItem[];
}

const CartItemList = ({ cartItems }: Props) => {
  return (
    <S.Container>
      {cartItems.map((item) => (
        <CartItemCard key={item.id} cartItem={item} />
      ))}
    </S.Container>
  );
};

export default CartItemList;

const S = {
  Container: styled.div`
    border-bottom: 1px solid ${STYLE_THEME.color.blackWithOpacity};
  `,
};
