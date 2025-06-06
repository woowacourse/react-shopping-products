import { PropsWithChildren, useEffect, useState } from "react";
import * as S from "../../styles/Common/ErrorBox.styles";

type ErrorBoxProps = PropsWithChildren<object>;

export default function ErrorBox({ children }: ErrorBoxProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <S.Div>
      <S.Span>{children}</S.Span>
    </S.Div>
  );
}
