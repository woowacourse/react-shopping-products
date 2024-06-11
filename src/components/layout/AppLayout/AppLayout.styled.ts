import styled from '@emotion/styled';
import { COLOR, SIZE } from '@styles/style.constant';

export const AppLayoutWrapper = styled.div`
  width: ${SIZE.layoutWidth};
  min-height: 100vh;
  margin: auto;
  background-color: ${COLOR.white};
  -webkit-box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.46);
  box-shadow: 0px 0px 27px -6px rgba(0, 0, 0, 0.46);
`;

export const LayoutWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: calc(${SIZE.navigationHeight} + 24px) 24px;
  box-sizing: border-box;
  position: relative;
`;

export const ShoppingCartButton = styled.button`
  cursor: pointer;
`;

export const Circle = styled.div`
  width: 20px;
  height: 20px;
  background-color: ${COLOR.white};
  border-radius: 50%;
  color: ${COLOR.black};
  font-size: 10px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 9px;
  right: -7px;
`;
