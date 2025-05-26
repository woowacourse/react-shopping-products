import Styled from "@emotion/styled";

export const ProductItemContainer = Styled.div`
  width:100%;
  height:224px;
  border-radius:8px;
  overflow:hidden;
  position: relative;
`;

export const ProductItemImage = Styled.img`
  height:112px;
  width:100%;
  object-fit:cover;
`;

export const SoldOutOverlay = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 112px;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SoldOutText = Styled.span`
  color: white;
  font-size: 16px;
  font-weight: 700;
`;

export const ProductItemBottom = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 15px 8px 8px;
  gap: 27px;
`;

export const ProductItemDetailBox = Styled.div`
  display: flex;
  flex-direction: column;
  gap:8px;
  width:100%;
`;

export const ProductName = Styled.p`
  font-size:14px;
  font-weight:700;
`;

export const ProductPrice = Styled.p`
  font-size:12px;
`;

export const ModalProductItemContainer = Styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
  padding: 8px;
  border-radius: 8px;
  background-color: white;
`;

export const ModalImageContainer = Styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const ModalProductItemImage = Styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

export const ModalSoldOutOverlay = Styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalProductContent = Styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  flex: 1;
  align-items: flex-start;
`;

export const ModalProductName = Styled.p`
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

export const ModalProductPrice = Styled.p`
  font-size: 12px;
  margin: 0;
  color: #666;
`;
