import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80px;
  font-size: 12px;

  p {
    text-align: center;
  }
`;

export const QuantityButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  border: 1px solid lightgrey;
  transition: background-color 0.1s;
  cursor: pointer;

  img {
    width: 12px;
    height: 12px;
  }
  &:hover {
    background-color: lightgrey;
  }
  &:active {
    background-color: grey;
  }
`;
