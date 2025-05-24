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

const MAX_QUANTITY = 3;

const CartModal = ({
  cartItems,
  quantityByProductId,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteProductInCart,
  totalPriceInCart,
}: Props) => {
  const { closeModal } = useModal();

  const handleDecreaseItemQuantity = (
    productId: number,
    isMinQuantity: boolean
  ) => {
    if (isMinQuantity) return;
    decreaseItemQuantity(productId);
  };

  const handleIncreaseItemQuantity = (
    productId: number,
    isMaxQuantity: boolean
  ) => {
    if (isMaxQuantity) return;
    increaseItemQuantity(productId);
  };

  return (
    <S.CartModal>
      <S.Title>장바구니</S.Title>
      <S.ScrollContainer>
        {cartItems?.content.map((productInfo) => {
          const quantity = quantityByProductId(productInfo.product.id);
          const isMinQuantity = quantity <= 1;
          const isMaxQuantity = quantity >= MAX_QUANTITY;

          return (
            <ProductItem
              key={productInfo.id}
              imageUrl={productInfo.product.imageUrl}
              name={productInfo.product.name}
              price={productInfo.product.price}
              quantity={quantity}
              increaseItemQuantity={() =>
                handleIncreaseItemQuantity(
                  productInfo.product.id,
                  isMaxQuantity
                )
              }
              decreaseItemQuantity={() =>
                handleDecreaseItemQuantity(
                  productInfo.product.id,
                  isMinQuantity
                )
              }
              deleteProductInCart={() =>
                deleteProductInCart(productInfo.product.id)
              }
              decreaseDisabled={isMinQuantity}
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
