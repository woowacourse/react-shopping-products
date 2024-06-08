import styled from "styled-components";

export const Wrapper = styled.div``;

export const CartProductImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
`;

export const CartProductInfo = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const CartProductName = styled.div`
  font-size: 16px;
  font-weight: 700;
`;

export const CartProductPrice = styled.div`
  font-size: 12px;
  font-weight: 500;
`;

export const CartPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
