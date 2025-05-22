import useModal from "../../hooks/useModal";
import * as S from "./CartModal.styles";
import ProductItem from "./components/ProductItem";

const CartModal = () => {
  const { closeModal } = useModal();

  return (
    <S.CartModal>
      <S.Title>장바구니</S.Title>
      <S.ScrollContainer>
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </S.ScrollContainer>
      <S.TotalPriceContainer>
        <S.TotalPriceLabel>총 결제 금액</S.TotalPriceLabel>
        <S.TotalPriceValue>95,000원</S.TotalPriceValue>
      </S.TotalPriceContainer>
      <S.CloseButton onClick={closeModal}>닫기</S.CloseButton>
    </S.CartModal>
  );
};

export default CartModal;
