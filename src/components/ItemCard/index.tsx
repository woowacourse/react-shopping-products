import { Product } from "@/types/products";
import ItemInfo from "@/components/ItemInfo";
import * as S from "@/components/ItemCard/style";
import CartActionButton from "@/components/CartActionButton";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import { memo } from "react";
import QuantityUpdateButton from "@/components/QuantityUpdateButton";

interface ItemCartProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCartProps) => {
  const { name, price, imageUrl, id } = product;
  const { onClickCartItem, getQuantityInCart, isInCart } = useHandleCartItem();

  const quantity = getQuantityInCart(id);

  return (
    <S.Wrapper>
      <S.Image $imgUrl={imageUrl} />
      <ItemInfo name={name} price={price} />
      <S.ButtonWrapper>
        {getQuantityInCart(id) > 0 ? (
          <QuantityUpdateButton quantity={quantity} />
        ) : (
          <CartActionButton isInCart={isInCart(id)} onClick={() => onClickCartItem(id)} />
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

const ItemCartMemo = memo(ItemCard);
export default ItemCartMemo;
