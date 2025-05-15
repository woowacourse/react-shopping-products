import styled from "@emotion/styled";

export const Header = styled.div`
  background-color: #000;
  width: calc(100% - 48px);
  height: 64px;
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  align-items: center;
  position: relative;
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

export const CartItemCount = styled.div`
  position: absolute;
  right: 24px;
  bottom: 12px;
  width: 19px;
  height: 19px;
  color: #000;
  font-size: 10px;
  font-weight: 700;
  text-align: center;
  line-height: 20px;
  background-color: #fff;
  border-radius: 100%;
  cursor: pointer;
`;
