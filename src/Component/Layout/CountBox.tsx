import * as S from "../../styles/Layout/CountBox.styles";

interface CountBoxProps {
  children: React.ReactNode;
}

export default function CountBox({ children }: CountBoxProps) {
  return <S.CountBox data-testid="cart-count-box">{children}</S.CountBox>;
}
