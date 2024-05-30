import BaseButton from './BaseButton';
import CartOut from '@/assets/cartOut.svg?react';
import { FlexSpaceBetween } from '@/style/common.style';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

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
    font-size: ${theme.fontSize.xsmall};
    font-weight: ${theme.fontWeight.bold};
  `,
};
