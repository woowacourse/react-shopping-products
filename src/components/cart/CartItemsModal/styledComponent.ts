import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const S = {
  Container: styled.div`
    box-sizing: border-box;
    border-radius: 8px;
    padding: 20px;
    width: 100%;
  `,

  CartItemsContainer: styled.div`
    max-height: 400px;
    overflow-y: scroll;
  `,

  Total: styled.div`
    display: flex;
    justify-content: space-between;
    font-weight: 700;

    border-top: 1px solid ${COLOR_PALETTE.lightGrey};
    padding: 20px 0px;
  `,

  TotalLabel: styled.div`
    font-size: 16px;
  `,

  TotalPrice: styled.div`
    font-size: 24px;
  `,

  EmptyCart: styled.div`
    text-align: center;
    margin: 20px;

    font-size: 20px;
    font-weight: 700;
  `,
};

export default S;
