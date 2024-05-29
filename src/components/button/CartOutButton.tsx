import BaseButton from './BaseButton';
import CartOut from '@/assets/cartOut.svg?react';
import { FlexSpaceBetween } from '@/style/common.style';
import styled from '@emotion/styled';

interface Props {
  onClick: () => void;
}

const CartOutButton = ({ onClick }: Props) => {
  return (
    <BaseButton $theme="light" onClick={onClick}>
      <S.ButtonContent>
        <CartOut />
        빼기
      </S.ButtonContent>
    </BaseButton>
  );
};

export default CartOutButton;

const S = {
  ButtonContent: styled.div`
    ${FlexSpaceBetween}
    gap: 5px;
    padding: 5px 10px;
  `,
};
