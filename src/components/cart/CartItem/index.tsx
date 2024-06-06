import useCartItemQuantity from "../../../hooks/useCartItemQuantity";
import { CartItemType } from "../../../types/cartItems";
import ProductControls from "../../domain/ProductControls";
import S from "./styledComponent";

function CartItem({ item }: { item: CartItemType }) {
  const { deleteItemMutation } = useCartItemQuantity();

  return (
    <S.CartItemContainer>
      <S.ProductImage src={item.product.imageUrl} alt={item.product.name} />
      <S.ProductDetailContainer>
        <S.ProductDetail>
          <S.NamePrice>
            <S.Name>{item.product.name}</S.Name>
            <S.Price>{`${item.product.price.toLocaleString()}원`}</S.Price>
          </S.NamePrice>
          <S.DeleteButton
            onClick={() => {
              deleteItemMutation.mutate(item.id);
            }}
          >
            삭제
          </S.DeleteButton>
        </S.ProductDetail>

        {/*<-- 수량 조절 --> */}
        <ProductControls cartItem={item} />
      </S.ProductDetailContainer>
    </S.CartItemContainer>
  );
}

export default CartItem;
