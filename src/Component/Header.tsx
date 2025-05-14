import styled from '@emotion/styled';

export default function Header() {
  return (
    <StyledHeader>
      <StyledSpan>SHOP</StyledSpan>
      <StyledButton type="button">
        <StyledImg src="/shoppingBagIcon.png" alt="shoppingBagIcon" />
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
`;

const StyledImg = styled.img`
  width: 24px;
  height: 24px;
`;
