import styled, { keyframes } from "styled-components";

const fadeInDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-64px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOutUp = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-64px);
  }
`;
export const StyledToast = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: inherit;
  height: 40px;
  top: 64px;
  background: #064420;
  position: fixed;
  z-index: 1;

  font-family: Noto Sans;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);

  animation: ${fadeInDown} 0.5s forwards, ${fadeOutUp} 0.5s forwards 3s;
  animation-delay: 0s, 3s;
`;
