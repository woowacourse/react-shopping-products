import styled from "styled-components";

export const StyledProductItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 224px;
`;

export const StyledProductImg = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 8px 8px 0px 0px;
`;

export const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 89px;
  margin: 15px 8px 8px 8px;
`;

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const StyledProductName = styled.span`
  font-family: Inter;
  font-size: 14px;
  font-weight: 700;
  color: rgba(10, 13, 19, 1);
`;

export const StyledProductPrice = styled.span`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  color: rgba(10, 13, 19, 1);
`;

export const ProductItemBundle = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const ProductItemControls = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  margin-top: 19px;
  width: 100%;
`;

export const ProductItemQuantity = styled.span`
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
`;
