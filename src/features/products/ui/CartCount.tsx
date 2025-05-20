import styled from '@emotion/styled';
import CustomButton from '../../../shared/ui/CustomButton';
import {css} from '@emotion/react';

type Props = {
  count: number;
  onPlusCount: () => void;
  onMinusCount: () => void;
  onCompleteCart: () => void;
};

export default function CartCount({
  count,
  onPlusCount,
  onMinusCount,
  onCompleteCart,
}: Props) {
  const className = css`
    background-color: #fff;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    padding: 5px 5px;
  `;

  return (
    <CartingSection>
      <CustomButton
        onClick={onMinusCount}
        iconUrl="./minusIcon.svg"
        css={className}
      />
      {count}
      <CustomButton
        onClick={onPlusCount}
        iconUrl="./plusIcon.svg"
        css={className}
      />
      <CompleteButton onClick={onCompleteCart}>✅</CompleteButton>
    </CartingSection>
  );
}

const CartingSection = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
`;

const CompleteButton = styled.button`
  cursor: pointer;
`;
