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
  const { getQuantityInCart, convertProductIdToCartId } = useHandleCartItem();

  const quantity = getQuantityInCart(id);

  const cartId = convertProductIdToCartId(id);

  return (
    <S.Wrapper>
      <S.Image $imgUrl={imageUrl} />
      <ItemInfo name={name} price={price} />
      <S.ButtonWrapper>
        {getQuantityInCart(id) > 0 && cartId ? (
          <QuantityUpdateButton quantity={quantity} cartId={cartId} />
        ) : (
          <CartActionButton productId={id} />
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

const ItemCartMemo = memo(ItemCard);
export default ItemCartMemo;
