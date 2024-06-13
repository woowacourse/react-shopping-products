import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid lightgrey;
  padding-top: 12px;
  row-gap: 12px;
`;

export const Body = styled.div`
  position: relative;
  display: flex;
  column-gap: 24px;
`;

export const DeleteButton = styled.button`
  position: absolute;
  top: 5px;
  right: 0px;
  width: 40px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid lightgrey;
  font-size: 12px;
  text-align: center;
  padding: 0px 8px;
  transition: background-color 0.1s;
  cursor: pointer;

  &:hover {
    background-color: lightgrey;
  }
  &:active {
    background-color: grey;
  }
`;

export const ItemImage = styled.img`
  display: flex;
  width: 112px;
  height: 112px;
  border-radius: 8px;
`;

export const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px;
`;

export const ItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;

export const ItemNameText = styled.p`
  font-size: 12px;
`;

export const ItemPriceText = styled.p`
  font-size: 24px;
  font-weight: 700;
`;
