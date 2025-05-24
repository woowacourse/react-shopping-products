import { CartItems } from "../../entities/cartItem/model/types";
import useModal from "../../shared/hooks/useModal";
import CartItem from "./CartItem/CartItem";
import * as S from "./CartModal.styles";

interface Props {
  cartItems: CartItems | null;
  quantityByProductId: (productId: number) => number;
  increaseItemQuantity: (productId: number) => Promise<void>;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  deleteProductInCart: (productId: number) => Promise<void>;
  totalPriceInCart: number;
}

const CartModal = ({
  cartItems,
  quantityByProductId,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteProductInCart,
  totalPriceInCart,
}: Props) => {
  const { closeModal } = useModal();

  return (
    <S.CartModal>
      <S.Title>장바구니</S.Title>
      <S.ScrollContainer>
        {cartItems?.content.map((productInfo) => {
          const quantity = quantityByProductId(productInfo.product.id);
          const isMaxQuantity = quantity >= productInfo.product.quantity;

          return (
            <CartItem
              key={productInfo.id}
              imageUrl={productInfo.product.imageUrl}
              name={productInfo.product.name}
              price={productInfo.product.price}
              quantity={quantity}
              increaseItemQuantity={() =>
                increaseItemQuantity(productInfo.product.id)
              }
              decreaseItemQuantity={() =>
                decreaseItemQuantity(productInfo.product.id)
              }
              deleteProductInCart={() =>
                deleteProductInCart(productInfo.product.id)
              }
              increaseDisabled={isMaxQuantity}
            />
          );
        })}
      </S.ScrollContainer>
      <S.TotalPriceContainer>
        <S.TotalPriceLabel>총 결제 금액</S.TotalPriceLabel>
        <S.TotalPriceValue>
          {totalPriceInCart.toLocaleString()}원
        </S.TotalPriceValue>
      </S.TotalPriceContainer>
      <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
    </S.CartModal>
  );
};

export default CartModal;
