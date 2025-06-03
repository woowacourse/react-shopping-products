import { css } from "@emotion/react";
import styled from "@emotion/styled";

export const TotalPriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CartItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 300px;
`;

export const modalStyle = css`
  max-width: 430px;
`;
