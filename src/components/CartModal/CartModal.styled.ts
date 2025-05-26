import Styled from "@emotion/styled";

export const ModalBackdrop = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export const ModalOverlay = Styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  z-index: 1000;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = Styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #000;
`;

export const ItemsContainer = Styled.div`
  flex: 1;
  padding: 0 16px;
  overflow-y: auto;
`;

export const Divider = Styled.div`
  height: 1px;
  background-color: rgba(0, 0, 0, 0.1);
  margin: 0 16px;
`;

export const TotalSection = Styled.div`
  padding: 16px;
  text-align: center;
`;

export const TotalText = Styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #000;
  margin-bottom: 16px;
`;

export const Button = Styled.button`
  width: calc(100% - 32px);
  margin: 0 16px 16px 16px;
  padding: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
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
