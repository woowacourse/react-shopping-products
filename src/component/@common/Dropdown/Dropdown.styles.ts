import { css } from '@emotion/react';
import { theme } from '../../../style';

export const dropdownTriggerStyle = css`
  display: flex;
  padding: 0.8rem;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;

  width: 10rem;

  border-radius: 8px;
  border: 1px solid ${theme.color.gray1};
  background: ${theme.color.white};
  cursor: pointer;
`;

export const dropdownListStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.8rem;

  width: 10rem;

  border-radius: 8px;
  border: 1px solid ${theme.color.gray1};
  background: ${theme.color.white};

  position: absolute;
  top: 100%;
  z-index: 10000;
`;

export const dropdownItemStyle = css`
  display: flex;
  padding: 0.8rem;

  width: 100%;
  cursor: pointer;

  &:hover {
    background: ${theme.color.gray1};
  }
`;

export const dropdownArrowIconStyle = (isOpen: boolean) => css`
  transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease;

  width: 1.5rem;
  height: 1.5rem;
`;
