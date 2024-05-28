import styled from "styled-components";

export const HeaderStyle = styled.header`
  display: flex;
  background-color: #000000;
  justify-content: space-between;
  width: inherit;
  height: 64px;
  position: fixed;
  z-index: 1;
  padding: 16px 24px 16px;
  box-sizing: border-box;

  .header_logo {
    width: 56px;
  }

  .header_cart {
    width: 32px;
  }
`;

export const CartCount = styled.div`
  background-color: #ffffff;
  border-radius: 999px;
  width: 19px;
  height: 19px;
  font-size: 10px;
  font-weight: 700;
  position: absolute;
  right: 24px;
  bottom: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
