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
  productIdsInCart: number[];
}

const CartModal = ({
  products,
  quantityByProductId,
  increaseItemQuantity,
  decreaseItemQuantity,
  deleteProductInCart,
  totalPriceInCart,
  productIdsInCart,
}: Props) => {
  const { closeModal } = useModal();

  return (
    <S.CartModal>
      <S.Title>장바구니</S.Title>
      <S.ScrollContainer>
        {products?.content
          .filter(({ id }) => productIdsInCart.includes(id))
          .map(({ id, imageUrl, name, price }) => (
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
        <S.TotalPriceValue>
          {totalPriceInCart.toLocaleString()}원
        </S.TotalPriceValue>
      </S.TotalPriceContainer>
      <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
    </S.CartModal>
  );
};

export default CartModal;
