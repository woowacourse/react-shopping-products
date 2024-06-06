import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const S = {
  CartItemContainer: styled.div`
    display: flex;
    gap: 10px;

    border-top: 1px solid ${COLOR_PALETTE.lightGrey};
    padding: 12px 0px 20px;
  `,

  ProductDetailContainer: styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `,

  ProductImage: styled.img`
    width: 80px;
    aspect-ratio: 1/1;
  `,

  ProductDetail: styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
  `,

  NamePrice: styled.div`
    display: flex;
    flex-direction: column;
  `,

  Name: styled.span`
    font-size: 16px;
    font-weight: bold;
  `,

  Price: styled.span`
    font-size: 14px;
  `,

  DeleteButton: styled.button`
    padding: 4px 12px;

    font-size: 15px;
    height: 32px;

    transition: all 0.2s;

    &:hover {
      background-color: ${COLOR_PALETTE.lightGrey};
    }
  `,
};

export default S;
