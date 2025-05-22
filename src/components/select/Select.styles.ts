import styled from '@emotion/styled';
import { fadeIn } from '../../animations/animations';
import { css } from '@emotion/react';

export const SelectContainer = styled.div`
  width: 100%;
  max-width: 125px;
  cursor: pointer;
  position: relative;
  z-index: var(--z-index-select);
`;

export const SelectField = styled.button<{ $isOpen: boolean }>`
  width: 100%;
  border: 1px solid var(--color-grey);
  border-radius: 4px;
  padding: 8px;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: ${({ $isOpen }) =>
    $isOpen ? '1px solid var(--color-black)' : '1px solid var(--color-grey)'};
`;

export const SelectIcon = styled.img`
  width: 16px;
`;

export const DefaultMessage = styled.p`
  font-size: var(--font-size-body);
`;

export const OptionsContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  color: var(--color-dark-grey);
  border: 1px solid var(--color-dark-grey);
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
  top: calc(100% + 4px);
  animation: ${fadeIn} 0.3s ease;
`;

export const OptionItem = styled.li<{ $isFocused: boolean }>`
  background-color: var(--color-white);
  font-size: var(--font-size-body);
  cursor: pointer;
  padding: 8px;
  box-sizing: border-box;
  ${({ $isFocused }) =>
    $isFocused &&
    css`
      background-color: var(--color-light-grey);
    `}
  &:hover {
    background-color: var(--color-grey);
  }
`;
