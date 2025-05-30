import styled from '@emotion/styled';
import { fadeInModal } from '../../../animations/animations';

export const Background = styled.div`
  max-width: var(--max-width-container);
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  color: black;
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-index-modal-background);
`;

export const ModalContainer = styled.div`
  max-width: var(--max-width-container);
  max-height: 70vh;
  width: 100%;
  border-radius: 8px;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: var(--z-index-modal);
  padding: 24px 32px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 24px;

  width: 100vw;
  animation: 0.3s ease-in-out ${fadeInModal};
`;

export const HeaderSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-weight: 700;
  font-size: 18px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: right;
`;

export const ModalButton = styled.button`
  width: 100%;
  border-radius: 4px;
  padding: 8px 20px;
  cursor: pointer;
  background: none;
  border: none;
  background-color: var(--color-dark-grey);
  color: var(--color-white);

  &:focus-visible {
    outline: 2px solid #4c9ffe;
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const ModalContent = styled.main`
  flex: 1;
  overflow: auto;

  &::after {
    content: '';
    display: block;
    height: 30px;
    width: 100%;
    position: sticky;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, var(--color-white));
    pointer-events: none;
  }
`;
