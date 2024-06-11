import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const S = {
  ProductControls: styled.div`
    width: 100px;
    display: flex;
    align-items: center;
  `,

  Button: styled.button`
    width: 32px;
    aspect-ratio: 1/1;
    font-size: 16px;

    transition: all 0.2s;

    &:hover {
      background-color: ${COLOR_PALETTE.lightGrey};
    }
  `,

  Quantity: styled.span`
    width: 40px;
    text-align: center;
    font-size: 16px;
  `,
};
export default S;
