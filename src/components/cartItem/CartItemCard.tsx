import useDeleteCartItem from '@/hooks/queries/cartItem/useDeleteCartItem';

import BaseButton from '@/components/button/BaseButton';
import CartControlButton from '@/components/button/CartControlButton';
import CartItemQuantityContainer from '@/components/cartItem/CartItemQuantityContainer';
import Toast from '@/components/Toast';

import type { CartItem } from '@/types/cartItem.type';

import styled from '@emotion/styled';
import { STYLE_THEME } from '@/styles/constants/theme';

interface Props {
  cartItem: CartItem;
}

const CartItemCard = ({ cartItem }: Props) => {
  const { id: cartItemId, quantity } = cartItem;
  const { name, price, imageUrl } = cartItem.product;

  const { deleteCartItem, error } = useDeleteCartItem();

  return (
    <>
      {error && <Toast message={error.message} />}
      <S.Container>
        <S.Image src={imageUrl} alt={`${name} 이미지`} />
        <S.Details>
          <S.ItemInfo>
            <S.Name>{name}</S.Name>
            <div>{price.toLocaleString()}원</div>
          </S.ItemInfo>
          <CartItemQuantityContainer
            cartItemId={cartItemId}
            quantity={quantity}
          />
        </S.Details>
        <CartControlButton
          $theme="white"
          onClick={() => deleteCartItem(cartItemId)}
        >
          삭제
        </CartControlButton>
      </S.Container>
    </>
  );
};

export default CartItemCard;

const S = {
  Container: styled.div`
    display: flex;
    padding: 1rem;
    border-top: 1px solid #e0e0e0;
  `,
  Image: styled.img`
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
  `,
  Details: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex: 1;
    margin-left: 16px;
    font-size: ${STYLE_THEME.fontSize.xs};
    font-weight: ${STYLE_THEME.fontWeight.medium};
    color: ${STYLE_THEME.color.black};
  `,
  ItemInfo: styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    height: 45px;
  `,
  Name: styled.div`
    font-size: ${STYLE_THEME.fontSize.medium};
    font-weight: ${STYLE_THEME.fontWeight.bold};
  `,

  RemoveButton: styled(BaseButton)`
    margin-left: 1rem;
    background-color: #f5f5f5;
    color: #888;
  `,
};
