import useModal from "../../hooks/useModal";
import { Products } from "../../types/products";
import * as S from "./CartModal.styles";
import ProductItem from "./components/ProductItem";

interface Props {
  products: Products | null;
  quantityByProductId: (productId: number) => number;
  increaseItemQuantity: (productId: number) => Promise<void>;
  decreaseItemQuantity: (productId: number) => Promise<void>;
  deleteProductInCart: (productId: number) => Promise<void>;
  totalPriceInCart: number;
}

const CartModal = ({
  products,
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
        {/* TODO: 장바구니 담긴 애들만 필터링하기 */}
        {products?.content.map(({ id, imageUrl, name, price }) => (
          <ProductItem
            key={id}
            imageUrl={imageUrl}
            name={name}
            price={price}
            quantity={quantityByProductId(id)}
            increaseItemQuantity={() => increaseItemQuantity(id)}
            decreaseItemQuantity={() => decreaseItemQuantity(id)}
            deleteProductInCart={() => deleteProductInCart(id)}
          />
        ))}
      </S.ScrollContainer>
      <S.TotalPriceContainer>
        <S.TotalPriceLabel>총 결제 금액</S.TotalPriceLabel>
        <S.TotalPriceValue>{totalPriceInCart}</S.TotalPriceValue>
      </S.TotalPriceContainer>
      <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
    </S.CartModal>
  );
};

export default CartModal;
