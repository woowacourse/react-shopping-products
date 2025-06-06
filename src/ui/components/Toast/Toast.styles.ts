import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeIn = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 64px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 4px;
  pointer-events: none;
`;

export const ToastContainer = styled.div<{ isExiting?: boolean }>`
  width: 100%;
  height: 40px;
  padding: 12px 77px 12px 77px;
  background-color: #ffc9c9;
  text-align: center;
  animation: ${(props) => (props.isExiting ? fadeOut : fadeIn)} 0.3s ease-in-out;
`;

export const Message = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #0a0d13;
`;
