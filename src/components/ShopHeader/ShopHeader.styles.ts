import styled from "@emotion/styled";

export const Header = styled.div`
  background-color: #000;
  width: calc(100% - 48px);
  height: 64px;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
`;

export const Logo = styled.a`
  font-weight: 800;
  font-size: 20px;
  color: #fff;
  text-decoration: none;
`;

export const CartImage = styled.img`
  cursor: pointer;
`;
