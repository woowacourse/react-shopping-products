import BaseButton from '@/components/button/BaseButton';
import CartIn from '@/assets/cartIn.svg?react';

import { STYLE_THEME } from '@/styles/constants/theme';
import styled from '@emotion/styled';

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
    display: flex;
    justify-content: space-between;
    gap: 5px;
    padding: 5px 10px;
    font-size: ${STYLE_THEME.fontSize.xs};
    font-weight: ${STYLE_THEME.fontWeight.bold};
  `,
};
