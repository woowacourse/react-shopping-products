import React from "react";
import emptyCart from "@/assets/emptycart.png";
import noProductFound from "@/assets/noproductfound.png";
import { EMPTY } from "@/constants/messages";
import * as S from "@/components/_common/EmptyState/style";

type EmptyPageType = "cart" | "products";

const EmptyContents: Record<EmptyPageType, { image: string; text: string }> = {
  cart: {
    image: emptyCart,
    text: EMPTY.emptyCartItems,
  },
  products: {
    image: noProductFound,
    text: EMPTY.emtpyProducts,
  },
};

interface EmptyStateProps {
  type: EmptyPageType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  return (
    <S.Wrapper>
      <S.EmptyImage src={EmptyContents[type].image} alt="Empty state image" />
      <div>{EmptyContents[type].text}</div>
    </S.Wrapper>
  );
};

export default EmptyState;
