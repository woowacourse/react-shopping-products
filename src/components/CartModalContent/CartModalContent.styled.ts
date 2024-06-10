import styled from "styled-components";

export const StyledCartItem = styled.div`
  display: flex;
  align-items: center;
  width: 397px;
  height: 80px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
  padding-top: 10px;
`;

export const StyledCartItemImageContainer = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 8px;
`;

export const StyledCartItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const StyledCartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 20px;
  width: 100%;
  height: 80px;
  box-sizing: content-box;
`;

export const StyledCartItemText = styled.div`
  display: flex;
  justify-content: space-between;
  height: 45px;
`;

export const StyledCartItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledCartItemName = styled.span`
  font-family: Noto Sans KR;
  font-size: 16px;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
`;

export const StyledCartItemPrice = styled.span`
  font-family: Noto Sans;
  font-size: 12px;
  font-weight: 500;
  color: rgba(10, 13, 19, 1);
  margin-top: 4px;
`;

export const StyledCartTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 382px;
  height: 42px;
  margin-top: 12px;
  margin-bottom: 24px;
`;

export const StyledCartTotalTitle = styled.span`
  font-family: Noto Sans;
  font-size: 16px;
  font-weight: 700;
  color: rgba(10, 13, 19, 1);
`;

export const StyledCartTotalPrice = styled.span`
  font-family: Noto Sans KR;
  font-size: 24px;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);
`;
