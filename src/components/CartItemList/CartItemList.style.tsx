import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  row-gap: 16px;
`;

export const SelectAllButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 8px;
  align-items: center;
  overflow-y: auto;
  margin-bottom: 70px;

  p {
    font-size: 12px;
  }
`;

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const EmptyCartImage = styled.img`
  width: 120px;
  height: auto;
  margin-bottom: 20px;
`;

export const EmptyCartMessage = styled.div`
  font-size: 18px;
  color: #666;
`;
