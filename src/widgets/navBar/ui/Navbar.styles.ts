import styled from '@emotion/styled';

export const NavbarWrapper = styled.div`
  position: fixed;
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

export const CartIconButtonContainer = styled.button`
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

export const ModalContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ModalContentHeader = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  color: #000;
`;

export const ModalContentBody = styled.div`
  width: 100%;
  max-height: 400px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 8px;
  border: 1px solid #333333;
  padding: 16px;
`;

export const ModalTotalPriceContainer = styled.div`
  width: 100%;
  color: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTotalPriceLabel = styled.span`
  font-size: 16px;
  font-weight: 700;
`;

export const ModalTotalPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
`;
