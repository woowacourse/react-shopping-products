import styled from '@emotion/styled';

interface HeaderProps {
  cartItemCount: number;
  status: 'idle' | 'loading' | 'success' | 'error';
}

export default function Header({ cartItemCount, status }: HeaderProps) {
  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button">
        <StyledImg src="./shoppingBagIcon.png" alt="shoppingBagIcon" />
        {status === 'success' ? (
          <StyledCountBox data-testid="cart-count-box">
            <StyledCountText data-testid="cart-count">
              {cartItemCount}
            </StyledCountText>
          </StyledCountBox>
        ) : null}
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

const StyledCountText = styled.span`
  font-weight: 700;
`;
