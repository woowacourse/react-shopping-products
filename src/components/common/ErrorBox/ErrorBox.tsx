import * as S from "./ErrorBox.styled";
import { useEffect, useState } from "react";

interface ErrorBoxProps {
  backgroundColor: string;
  text: string;
}

function ErrorBox({ backgroundColor, text }: ErrorBoxProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (text) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [text]);

  if (!text) return null;

  return (
    isOpen && (
      <S.ErrorBoxContainer backgroundColor={backgroundColor}>
        <p>{text}</p>
      </S.ErrorBoxContainer>
    )
  );
}

export default ErrorBox;
