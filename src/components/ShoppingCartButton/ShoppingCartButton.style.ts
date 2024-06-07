import styled from "styled-components";

export const Container = styled.button`
  display: flex;
  position: relative;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border: none;
  width: 32px;
  height: 32px;
`;

export const ShoppingCartButton = styled.button`
  display: flex;
  position: relative;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  border: none;
  width: 32px;
  height: 32px;
`;

export const ShoppingCartIconContainer = styled.img`
  position: fixed;
  width: 20px;
  cursor: pointer;
`;

export const ShoppingCartQuantityContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19px;
  height: 19px;
  border-radius: 50%;
  background: white;
  color: black;
  font-size: 12px;
  font-weight: 700;
  position: absolute;
  bottom: 0px;
  right: 0px;

  cursor: pointer;
`;

export const ShoppingCartQuantity = styled.p`
  margin-top: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Montserrat;
  font-size: 10px;
  font-weight: 700;
  text-align: left;

  vertical-align: baseline;
`;
