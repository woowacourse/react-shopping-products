import styled from "@emotion/styled";
export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  border-top: 1px solid #eaeaea;
  padding: 20px 0px;
  align-items: stretch;
`;

export const ItemContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const PriceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
  margin-top: 20px;
`;
export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
`;

export const CloseButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #333333;
  color: white;
  border: none;
  cursor: pointer;
`;
