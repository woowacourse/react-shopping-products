import styled from "styled-components";

export const StyledProductItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 182px;
  height: 224px;
  border-radius: 8px;
  box-shadow: 1px 1px 2px 1px rgba(10, 13, 19, 0.5);
`;

export const StyledProductImg = styled.img`
  width: 100%;
  height: 112px;
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

export const StyledProductQuantityContainer = styled.div`
  height: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  margin-top: 24px;
  padding-bottom: 6px;
`;

export const StyledProductQuantityText = styled.span`
  width: 24px;

  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  color: rgba(10, 13, 19, 1);
`;
