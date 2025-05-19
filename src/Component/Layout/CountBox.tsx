import styled from "@emotion/styled";

interface CountBoxProps {
  children: React.ReactNode;
}

export default function CountBox({ children }: CountBoxProps) {
  return (
    <StyledCountBox data-testid="cart-count-box">{children}</StyledCountBox>
  );
}

const StyledCountBox = styled.div`
  width: 19px;
  height: 19px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  left: 7px;
  bottom: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
