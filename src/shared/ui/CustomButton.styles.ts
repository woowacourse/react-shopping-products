import { SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

export const CustomButton = styled.button<{ css?: SerializedStyles }>`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0 8px;
  border-radius: 4px;
  cursor: pointer;

  background-color: #000;
  color: #fff;
  border: 1px solid #000;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ButtonIcon = styled.img`
  width: 15px;
  height: 15px;
`;

export const ButtonTitle = styled.span``;
