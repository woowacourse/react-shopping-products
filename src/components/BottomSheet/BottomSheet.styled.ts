import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Backdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  width: 500px;
  position: fixed;
  left: 50%;
  top: 0;
  transform: translateX(-50%);
  z-index: 999;
  animation: ${fadeIn} 0.3s ease;
`;

export const Modal = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  padding: 1.5rem 1rem;
  min-height: 180px;
  width: 100%;
  bottom: 0;
  border-radius: 8px 8px 0 0;
  animation: ${slideUp} 0.6s ease;
`;

export const Header = styled.div`
  color: #000;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const CloseButton = styled.button`
  color: #fff;
  font-size: 0.9375rem;
  font-weight: 700;
  width: 100%;
  padding: 0.75rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #333;
  border-radius: 4px;
`;
