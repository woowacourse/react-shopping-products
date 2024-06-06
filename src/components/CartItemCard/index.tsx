import * as S from "@/components/CartItemCard/style";
import ItemInfo from "@/components/ItemInfo";
import Stepper from "@/components/_common/Stepper";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import { Product } from "@/types/products";

const CartItemCard = ({ product }: { product: Product }) => {
  const { name, price, imageUrl, id } = product;
  const { updateCartItemQuantity, removeCartItem, getCartItemQuantity } = useHandleCartItem();

  return (
    <S.ItemWrapper>
      <S.Image src={imageUrl} />
      <S.ItemInfoContainer>
        <S.ItemInfoWrapper>
          <ItemInfo name={name} price={price} />
          <Stepper
            count={getCartItemQuantity(id)}
            plusAction={() => updateCartItemQuantity(id, "plus")}
            minusAction={() => updateCartItemQuantity(id, "minus")}
          />
        </S.ItemInfoWrapper>
        <S.RemoveButton onClick={() => removeCartItem(id)}>삭제</S.RemoveButton>
      </S.ItemInfoContainer>
    </S.ItemWrapper>
  );
};

export default CartItemCard;
