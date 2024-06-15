import styled from "styled-components";

export const ProductItemStyle = styled.div`
  background-color: #ffffff;
  color: #000000;
  border-radius: 8px;
  width: 182px;
  height: 224px;
  box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
`;

export const ProductImg = styled.img`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: inherit;
  height: 112px;
  box-sizing: border-box;
  object-fit: cover;
`;

export const ProductGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 8px;
  box-sizing: border-box;
  height: 112px;
`;

export const ProductContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
  line-height: 15px;
  margin-bottom: 4px;
`;

export const ProductName = styled.div`
  font-weight: 700;
  font-size: 14px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const AppendCartButton = styled.div`
  cursor: pointer;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  border-radius: 4px;
  padding: 4px 8px;
  gap: 1px;
  font-weight: 600;
  font-size: 12px;
  width: auto;
  background-color: #000000;
  color: #ffffff;
  img {
    width: 14px;
    height: 14px;
  }
`;
