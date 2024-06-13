import styled from "styled-components";

export const HeaderBackground = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100%;
  background: #000000;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 640px;
  height: 64px;
  padding: 0px 24px;
`;

export const MainLogo = styled.img`
  width: 56px;
  cursor: pointer;
`;
