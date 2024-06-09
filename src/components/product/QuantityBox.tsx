import BorderButton from '@/components/button/BorderButton';
import { FlexRow } from '@/style/common.style';
import Minus from '@/assets/Minus.svg?react';
import Plus from '@/assets/Plus.svg?react';
import styled from '@emotion/styled';

interface Props {
  quantity: number;
  handleQuantity: (quantity: number) => void;
}

const QuantityBox = ({ quantity, handleQuantity }: Props) => {
  return (
    <>
      <S.QuantityWrapper>
        <BorderButton onClick={() => handleQuantity(quantity - 1)}>
          <Minus />
        </BorderButton>
        {quantity}
        <BorderButton onClick={() => handleQuantity(quantity + 1)}>
          <Plus />
        </BorderButton>
      </S.QuantityWrapper>
    </>
  );
};

export default QuantityBox;

const S = {
  QuantityWrapper: styled.div`
    ${FlexRow}
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  `,
};
