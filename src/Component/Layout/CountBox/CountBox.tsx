import { StyledCountBox } from "./CountBox.styles";

interface CountBoxProps {
  children: React.ReactNode;
}

export default function CountBox({ children }: CountBoxProps) {
  return (
    <StyledCountBox data-testid="cart-count-box">{children}</StyledCountBox>
  );
}
