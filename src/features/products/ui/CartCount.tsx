import styled from '@emotion/styled';
import CustomButton from '../../../shared/ui/CustomButton';
import {css} from '@emotion/react';

type Props = {
  count: number;
  onPlusCount: () => void;
  onMinusCount: () => void;
};

export default function CartCount({count, onPlusCount, onMinusCount}: Props) {
  const className = css`
    background-color: #fff;
    border: 1px solid #d5d5d5;
    border-radius: 10px;
    padding: 5px 5px;
  `;

  return (
    <CartCountSection>
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
    </CartCountSection>
  );
}

const CartCountSection = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
`;
