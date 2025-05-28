import { PropsWithChildren, useEffect, useState } from "react";
import { StyledDiv, StyledSpan } from "../../styles/Common/ErrorBox.styles";

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
    <StyledDiv>
      <StyledSpan>{children}</StyledSpan>
    </StyledDiv>
  );
}
