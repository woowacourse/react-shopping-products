import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const ErrorToast = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 10px 16px;
  background-color: #ffc9c9;
  font-size: 12px;
  font-weight: 500;
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  animation: ${fadeInDown} 0.3s;
`;
