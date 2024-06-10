import BorderButton from "../Button/BorderButton";
import { CartItem } from "../../types/cartItems";
import EditCartItemButton from "./EditCartItemButton";
import LoadingDots from "../LoadingDots";
import styled from "@emotion/styled";
import useManageCartItem from "../../hooks/cartItem/useManageCartItem";
import { useState } from "react";

interface Props {
  item: CartItem;
}

const CartItemCard = ({ item }: Props) => {
  const { product } = item;
  const [deleteLoading] = useState(false);

  const { removeItemFromCart } = useManageCartItem();

  return (
    <S.ItemWrapper>
      <S.FlexBetweenBox>
        <S.FlexRowBox>
          <S.ItemImg src={product.imageUrl} alt={product.name} />
          <S.FlexColumnBox>
            <S.ItemName>{product.name}</S.ItemName>
            <S.ItemPrice>{product.price.toLocaleString("ko-KR")}원</S.ItemPrice>
            <EditCartItemButton id={product.id} />
          </S.FlexColumnBox>
        </S.FlexRowBox>

        {deleteLoading ? (
          <LoadingDots />
        ) : (
          <BorderButton onClick={() => removeItemFromCart(product.id)}>
            삭제
          </BorderButton>
        )}
      </S.FlexBetweenBox>
    </S.ItemWrapper>
  );
};

export default CartItemCard;

const S = {
  ItemWrapper: styled.div`
    display: flex;
    flex-direction: column;

    width: 100%;

    margin-top: 10px;
    border-top: 1px solid #bebebe;
    padding: 16px 0;
  `,
  FlexBetweenBox: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  `,

  FlexRowBox: styled.div`
    display: flex;
    flex-direction: row;
    gap: 16px;
  `,

  FlexColumnBox: styled.div`
    display: flex;
    flex-direction: column;

    gap: 5px;
    margin-top: 10px;
  `,

  ItemImg: styled.img`
    width: 80px;
    height: 80px;

    border-radius: 8px;
  `,
  ItemName: styled.span`
    font-size: 16px;
    font-weight: 700;
  `,
  ItemPrice: styled.span`
    font-size: 12px;
    font-weight: 500;
  `,
};
