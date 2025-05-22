import styled from "@emotion/styled";

export const CartModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.p`
  font-weight: 700;
  font-size: 18px;
`;

export const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-height: 400px;
  overflow-y: auto;
`;

export const CloseButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #333;
  color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 700;
  font-size: 15px;
`;

export const TotalPriceContainer = styled.div`
  width: 100%;
  height: 42px;
  padding-top: 12px;
  border-top: 1px solid #0000001a;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TotalPriceLabel = styled.span`
  font-weight: 700;
  font-size: 16px;
  line-height: 16px;
`;

export const TotalPriceValue = styled.span`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
`;
