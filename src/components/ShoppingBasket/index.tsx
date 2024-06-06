import ItemInfo from "@/components/ItemInfo";
import TotalAmount from "@/components/TotalAmount";
import Stepper from "@/components/_common/Stepper";
import useHandleCartItem from "@/hooks/useHandleCartItem";
import * as S from "@/components/ShoppingBasket/style";

const ShoppingBasket = () => {
  const { cartItems, updateCartItemQuantity, removeCartItem, totalAmount } = useHandleCartItem();

  return (
    <S.Container>
      <S.CartItemWrapper>
        {cartItems &&
          cartItems.map((cartItem) => (
            <S.ItemWrapper>
              <S.Image src={cartItem.product.imageUrl} />
              <S.ItemInfoContainer>
                <S.ItemInfoWrapper>
                  <ItemInfo name={cartItem.product.name} price={cartItem.product.price} />
                  <Stepper
                    count={cartItem.quantity}
                    plusAction={() => updateCartItemQuantity(cartItem.product.id, "plus")}
                    minusAction={() => updateCartItemQuantity(cartItem.product.id, "minus")}
                  />
                </S.ItemInfoWrapper>
                <S.RemoveButton onClick={() => removeCartItem(cartItem.product.id)}>삭제</S.RemoveButton>
              </S.ItemInfoContainer>
            </S.ItemWrapper>
          ))}
      </S.CartItemWrapper>
      <S.TotalAmountWrapper>
        <TotalAmount amount={totalAmount()} />
      </S.TotalAmountWrapper>
    </S.Container>
  );
};

export default ShoppingBasket;
