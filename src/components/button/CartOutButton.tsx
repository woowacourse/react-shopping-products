import BaseButton from './BaseButton';
import CartOut from '@/assets/cartOut.svg?react';
import styled from '@emotion/styled';
import theme from '@/styles/theme.style';

interface Props {
  onClick: () => void;
}

const CartOutButton = ({ onClick }: Props) => {
  return (
    <BaseButton $theme="gray" onClick={onClick}>
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
    display: flex;
    justify-content: space-between;
    gap: 5px;
    padding: 5px 10px;
    font-size: ${theme.fontSize.xs};
    font-weight: ${theme.fontWeight.bold};
  `,
};
