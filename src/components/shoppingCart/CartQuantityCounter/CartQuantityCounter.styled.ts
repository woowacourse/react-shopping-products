import styled from '@emotion/styled';
import { COLOR } from '@styles/style.constant';

export const CartQuantityCounterWrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const CounterButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid ${COLOR.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
