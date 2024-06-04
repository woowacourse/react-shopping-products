import styled from "@emotion/styled";
import COLOR_PALETTE from "../../../style/colorPalette";

const S = {
  CartItemContainer: styled.div`
    display: flex;
    gap: 10px;

    padding-bottom: 24px;
    margin-top: 8px;
    border-bottom: 1px solid gray;
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
