import * as S from "./ErrorBox.styled";
import { useEffect, useState } from "react";

interface ErrorBoxProps {
  backgroundColor: string;
  text: string;
}

function ErrorBox({ backgroundColor, text }: ErrorBoxProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  }, []);

  return (
    isOpen && (
      <S.ErrorBoxContainer backgroundColor={backgroundColor}>
        <p>{text}</p>
      </S.ErrorBoxContainer>
    )
  );
}

export default ErrorBox;
