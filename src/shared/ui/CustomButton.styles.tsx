import {SerializedStyles} from '@emotion/react';
import styled from '@emotion/styled';

export const CustomButton = styled.button<{css?: SerializedStyles}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 0 8px;
  background-color: #000;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  ${({css}) => css}
`;

export const ButtonIcon = styled.img`
  width: 15px;
  height: 15px;
`;

export const ButtonTitle = styled.span``;
