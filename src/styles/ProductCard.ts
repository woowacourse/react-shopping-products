import styled from "@emotion/styled";

export const ProductCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px 20px;
  width: 100%;
  box-sizing: border-box;
  justify-items: center;
`;

export const ProductCardWrapper = styled.div`
  width: 182px;
  border-radius: 8px;
  overflow: hidden;
`;

export const ProductCardDetailWrapper = styled.div`
  padding: 15px 8px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 27px;
  align-items: flex-end;
`;

export const ProductCardDetailTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductCardName = styled.div`
  color: #0a0d13;
  font-size: 14px;
  font-weight: 700;
`;

export const ProductCardPrice = styled.div`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
`;
