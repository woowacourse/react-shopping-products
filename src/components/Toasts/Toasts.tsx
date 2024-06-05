import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import COLOR_PALETTE from "../../style/colorPalette";

const slideIn = keyframes`
  from {
    transform: translateY(20px) translateX(-50%);
    opacity: 0;
  }
  to {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0) translateX(-50%);
    opacity: 1;
  }
  to {
    transform: translateY(20px) translateX(-50%);
    opacity: 0;
  }
`;

const BaseToast = styled.div<{ visible: boolean }>`
  padding: 16px;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: inline-block;
  animation: ${({ visible }) => (visible ? slideIn : slideOut)} 0.5s ease-out;
  animation-fill-mode: forwards;
  z-index: 1000;
`;

const SuccessToast = styled(BaseToast)`
  background-color: ${COLOR_PALETTE.success};
`;

const FailToast = styled(BaseToast)`
  background-color: ${COLOR_PALETTE.fail};
`;

const S = {
  BaseToast,
  SuccessToast,
  FailToast,
};

type ToastProps = {
  children: React.ReactNode;
};

export const SuccessToastComponent: React.FC<ToastProps> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <S.SuccessToast visible={visible}>{children}</S.SuccessToast>;
};

export const FailToastComponent: React.FC<ToastProps> = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <S.FailToast visible={visible}>{children}</S.FailToast>;
};
