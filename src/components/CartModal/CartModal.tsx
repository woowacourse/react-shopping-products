import useModal from "../../hooks/useModal";
import { CartItems } from "../../types/cartItems";
import * as S from "./CartModal.styles";
import ProductItem from "./components/ProductItem";

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
        {cartItems?.content.map((productInfo) => (
          <ProductItem
            key={productInfo.id}
            imageUrl={productInfo.product.imageUrl}
            name={productInfo.product.name}
            price={productInfo.product.price}
            quantity={quantityByProductId(productInfo.product.id)}
            increaseItemQuantity={() =>
              increaseItemQuantity(productInfo.product.id)
            }
            decreaseItemQuantity={() =>
              decreaseItemQuantity(productInfo.product.id)
            }
            deleteProductInCart={() =>
              deleteProductInCart(productInfo.product.id)
            }
          />
        ))}
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
