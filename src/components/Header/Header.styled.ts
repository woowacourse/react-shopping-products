import Styled from "@emotion/styled";

export const HeaderContainer = Styled.div`
  width:100%;
  height:64px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  background-color:black;
  color:white;
  padding:0 24px;
  font-size:20px;
`;

export const HeaderTitle = Styled.h2`
  font-weight:800;
`;

export const HeaderIconContainer = Styled.div`
  position: relative;
`;

export const CartBadge = Styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 19px;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: 700;
`;

export const ModalContent = Styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  width: 100%;
  max-width: 500px;
`;

export const ModalHeader = Styled.div`
  padding: 20px 24px 16px;
`;

export const ModalTitle = Styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #333;
`;

export const ModalDivider = Styled.hr`
  margin: 0;
  border: none;
  border-top: 1px solid #e0e0e0;
`;

export const CartItemsContainer = Styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  max-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyCartMessage = Styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  font-size: 16px;
`;

export const CartSummary = Styled.div`
  padding: 20px 24px;

`;

export const TotalPriceContainer = Styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const TotalPriceLabel = Styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;

export const TotalPrice = Styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #2c5aa0;
`;

export const CloseButton = Styled.button`
  width: 100%;
  height: 44px;
  padding: 14px;
  background-color: #000000;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1e3d6f;
  }

  &:active {
    background-color: #0f2744;
  }
`;
