import styled from '@emotion/styled';
import { COLOR } from '@styles/style.constant';

export const CardContainer = styled.li`
  width: 100%;

  border-radius: 8px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 112px;
  object-fit: fill;
  object-position: 50% 50%;
`;

export const CardDescription = styled.div`
  padding: 15px 8px 8px 8px;
  font-size: 12px;
  font-weight: 500;
`;

export const ProductName = styled.h3`
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
`;

export const CardToggleButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const CardToggleButton = styled.button<{ $isAddedCart: boolean }>`
  width: 59px;
  height: 24px;
  border-radius: 4px;
  padding: 8px 4px;
  cursor: pointer;
  background-color: ${({ $isAddedCart }) => ($isAddedCart ? COLOR.black : COLOR.lightGray)};
  color: ${({ $isAddedCart }) => ($isAddedCart ? COLOR.white : COLOR.black)};
  gap: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
