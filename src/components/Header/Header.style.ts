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
