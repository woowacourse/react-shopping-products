import styled from '@emotion/styled';

export const NavbarWrapper = styled.div`
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
`;

export const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  box-sizing: border-box;
`;

export const Logo = styled.div`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

export const CartIconContainer = styled.div`
  height: 100%;
  position: relative;
  border-radius: 100%;
  cursor: pointer;
  padding: 2px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #5e5e5e;
  }
`;

export const CartQuantity = styled.div`
  width: 19px;
  height: 19px;
  font-size: 13px;
  font-weight: 700;
  background-color: #fff;
  border-radius: 100%;
  padding: 1px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 14px;
  left: 15px;
`;

export const CartIcon = styled.img``;

export const TotalPriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  margin: 10px 0;
`;

export const Description = styled.p``;

export const TotalPrice = styled.p`
  font-size: 24px;
`;
