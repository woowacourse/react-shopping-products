import { styled, keyframes } from "styled-components";

export const toastSlideIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const toastSlideOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const Container = styled.div<{ $isOpen: boolean; $bgColor: string; $textColor: string }>`
  position: fixed;
  top: 64px;
  width: 430px;
  padding: 0.8rem;
  gap: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.$textColor};
  background: ${(props) => props.$bgColor};
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.4);
  animation: ${({ $isOpen }) => ($isOpen ? toastSlideIn : toastSlideOut)} 0.4s ease-in-out forwards;
  overflow-x: hidden;
`;

export const ToastMessage = styled.span`
  font-size: 12px;
  font-weight: 500;
  line-height: normal;
`;
