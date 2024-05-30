import BaseButton from '@/components/button/BaseButton';
import CartIn from '@/assets/cartIn.svg?react';
import { FlexSpaceBetween } from '@/style/common.style';
import styled from '@emotion/styled';
import { theme } from '@/style/theme.style';

interface Props {
  onClick: () => void;
}

const CartInButton = ({ onClick }: Props) => {
  return (
    <BaseButton $theme="dark" onClick={onClick}>
      <S.ButtonContent>
        <CartIn />
        담기
      </S.ButtonContent>
    </BaseButton>
  );
};

export default CartInButton;

const S = {
  ButtonContent: styled.div`
    ${FlexSpaceBetween}
    gap: 5px;
    padding: 5px 10px;
    font-size: ${theme.fontSize.xsmall};
    font-weight: ${theme.fontWeight.bold};
  `,
};
