import styled from "@emotion/styled";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  width: 100%;
  max-width: 430px;
  background: #ffffff;
  border-radius: 16px 16px 0 0;
  padding: 24px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

export const CartItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemDetails = styled.div`
  flex: 1;
`;

export const ItemName = styled.div`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const ItemPrice = styled.div`
  font-size: 13px;
  margin-top: 4px;
  margin-bottom: 10px;
`;

export const DeleteButton = styled.button`
  font-size: 13px;
  border: 1px solid #ccc;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  align-self: flex-start;

  &:hover {
    background: #f5f5f5;
  }
`;

export const TotalSection = styled.div`
  margin-top: 24px;
  padding-top: 16px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

export const TotalLabel = styled.div`
  font-size: 14px;
`;

export const TotalPrice = styled.div`
  font-size: 18px;
`;

export const CloseButton = styled.button`
  margin-top: 24px;
  width: 100%;
  padding: 12px 0;
  background: #2f2f2f;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;
