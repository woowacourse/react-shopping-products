import styled from "@emotion/styled";

export const ProductCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0px 20px;
  width: 100%;
  box-sizing: border-box;
  justify-items: center;
  padding-bottom: 50px;
`;

export const ProductCardWrapper = styled.div`
  width: 182px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const ProductImageWrapper = styled.div`
  position: relative;
`;

export const ProductImage = styled.img`
  width: 182px;
  height: 112px;
  object-fit: cover;
  display: block;
`;

export const ProductCardDetailWrapper = styled.div`
  height: 114px;
  padding: 15px 8px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 27px;
  align-items: flex-end;
  background-color: #ffffff;
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

export const SoldOutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 2rem;
  font-weight: bold;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`;
