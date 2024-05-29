import styled from "styled-components";
import { SCREEN_WIDTH_REM } from "../styles/GlobalStyle";

const ShopHeader = () => {
  return <S.Header>Shop</S.Header>;
};

export default ShopHeader;

const S = {
  Header: styled.header`
    display: flex;
    align-items: center;
    width: 100%;
    height: 6.4rem;
    padding: 2.4rem;
    background-color: #000000;
    position: fixed;
    top: 0;
    max-width: ${`${SCREEN_WIDTH_REM}rem`};
  `,
};
