import styled from '@emotion/styled';

export const ModalContainer = styled.div`
  width: 100%;
  margin: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  overflow-y: auto;
`;

export const ModalTotalPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ModalTotalPriceContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTotalPriceTitleText = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

export const ModalTotalPriceText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #000;
`;

export const ModalBr = styled.div`
  height: 1px;
  background-color: #e5e5e5;
`;

export const ModalProductContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ModalProductItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 16px;
`;

export const ModalProductItemImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
  display: block;
  flex-shrink: 0;
`;

export const ModalProductItemContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;

  & > #left-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
`;

export const ModalProductItemName = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #000;
`;

export const ModalProductItemPrice = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #0a0d13;
`;

export const ModalProductItemDeleteButton = styled.button`
  width: 46px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  border: 1px solid #e5e5e5;
`;
