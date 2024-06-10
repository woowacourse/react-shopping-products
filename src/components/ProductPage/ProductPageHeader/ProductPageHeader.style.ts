import styled from "styled-components";

import { CartItemIcon } from "../../../assets";

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CartButton = styled.button`
  width: 32px;
  height: 32px;
  background: url("${CartItemIcon}") no-repeat center 2px;
  background-size: auto;
  cursor: pointer;
`;

export const CartItemsNumber = styled.div`
  position: absolute;
  top: 27px;
  right: 25px;
  width: 19px;
  height: 19px;
  background: #ffffff;
  color: #000000;
  font-size: 10px;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
