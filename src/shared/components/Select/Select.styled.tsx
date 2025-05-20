import styled from '@emotion/styled';

import { Props } from '.';

export const StyledSelectContainer = styled.div<Pick<Props, 'maxWidth'>>`
  position: relative;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: white;
  padding: 8px 12px;
  max-width: ${({ maxWidth }) => (typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth)};
  cursor: pointer;
`;

export const StyledTriggerButton = styled.button`
  background-color: transparent;
  display: flex;
  border: none;
  padding: 0;
  cursor: pointer;
`;

export const StyledOptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  border: 1px solid rbga(255, 255, 255, 0.1);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 10;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  padding: 8px;
  margin-top: 10px;
  box-sizing: border-box;
`;

export const StyledSelectIcon = styled.img<{ isOpen: boolean }>`
  position: absolute;
  top: 8px;
  right: 12px;
  height: 20px;
  transition: transform 0.3s ease;

  transform: ${({ isOpen }) => isOpen && `rotate(180deg); `};
`;

export const StyledOption = styled.div`
  background-color: white;

  z-index: 1;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  padding: 8px;
  box-sizing: border-box;

  :last-child {
    border-bottom: none;
  }
  :hover {
    border-radius: 4px;
    background-color: rgba(205, 205, 205, 0.63);
  }
`;
