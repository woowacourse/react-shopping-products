import styled from "@emotion/styled";
import shoppingBagIcon from "../../assets/shoppingBagIcon.png";
import CountBox from "./CountBox";

interface HeaderProps {
  cartItemCount: number;
  status: "idle" | "loading" | "success" | "error";
}

export default function Header({ cartItemCount, status }: HeaderProps) {
  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button">
        <StyledImg src={shoppingBagIcon} alt="shoppingBagIcon" />
        {status === "success" && (
          <CountBox>
            <StyledCountText data-testid="cart-count">
              {cartItemCount}
            </StyledCountText>
          </CountBox>
        )}
      </StyledButton>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: #000000;
  height: 64px;
`;

const StyledSpan = styled.span`
  color: #ffffff;
  font-weight: 800px;
`;

const StyledButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: relative;
`;

const StyledImg = styled.img`
  width: 24px;
  height: 24px;
`;

const StyledCountText = styled.span`
  font-weight: 700;
`;
