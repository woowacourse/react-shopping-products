import TotalAmount from "@/components/TotalAmount";
import * as S from "@/components/ShoppingBasket/style";
import CartItemCard from "@/components/CartItemCard";
import { IMAGES } from "@/assets/images";
import useCartItems from "@/hooks/useCartItems";

const ShoppingBasket = () => {
  const { cartItems, totalAmount } = useCartItems();

  const hasCartItems = cartItems && cartItems.length > 0;

  return (
    <S.Container>
      <S.CartItemWrapper>
        {hasCartItems ? (
          cartItems.map((cartItem) => <CartItemCard product={cartItem.product} />)
        ) : (
          <S.ImgWrapper>
            <S.Img src={IMAGES.seaOtterImg} />
            <h2>🦦 장바구니에 아이템을 추가해주세요</h2>
          </S.ImgWrapper>
        )}
      </S.CartItemWrapper>
      {hasCartItems && (
        <S.TotalAmountWrapper>
          <TotalAmount amount={totalAmount()} />
        </S.TotalAmountWrapper>
      )}
    </S.Container>
  );
};

export default ShoppingBasket;
