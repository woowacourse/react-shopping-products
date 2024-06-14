import { Product } from "@/types/products";
import ItemInfo from "@/components/ItemInfo";
import * as S from "@/components/ItemCard/style";
import CartActionButton from "@/components/CartActionButton";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import Stepper from "@/components/_common/Stepper";
import useCartItems from "@/hooks/useCartItems";

interface ItemCartProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCartProps) => {
  const { name, price, imageUrl, id } = product;
  const { isInCart } = useCartItems();
  const { getCartItemQuantity, addCartItem, updateCartItemQuantity } = useHandleCartItem();

  return (
    <S.Wrapper>
      <S.Image $imgUrl={imageUrl} />
      <S.ItemInfoWrapper>
        <ItemInfo name={name} price={price} />
      </S.ItemInfoWrapper>
      <S.ButtonWrapper>
        {isInCart(id) ? (
          <Stepper
            count={getCartItemQuantity(id)}
            plusAction={() => updateCartItemQuantity(id, "plus")}
            minusAction={() => updateCartItemQuantity(id, "minus")}
          />
        ) : (
          <CartActionButton isInCart={isInCart(id)} onClick={() => addCartItem(id)} />
        )}
      </S.ButtonWrapper>
    </S.Wrapper>
  );
};

export default ItemCard;
