import { useEffect, useState } from "react";

import * as Styled from "./Toast.style";

interface ToastProps {
  message: string;
  duration?: number;
  style: ToastStyleProps;
  onClose: () => void;
}

interface ToastStyleProps {
  textColor: string;
  bgColor: string;
}

export default function Toast({ message, duration = 3000, style, onClose }: ToastProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosed, setIsClosed] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(true);
    setIsClosed(false);

    const timer = setTimeout(() => {
      setIsOpen(false);
      setTimeout(() => {
        setIsClosed(true);
        onClose();
      }, 400);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (isClosed) return null;

  return (
    <Styled.Container
      $isOpen={isOpen}
      $textColor={style.textColor}
      $bgColor={style.bgColor}
    >
      <Styled.ToastMessage>{message}</Styled.ToastMessage>
    </Styled.Container>
  );
}
