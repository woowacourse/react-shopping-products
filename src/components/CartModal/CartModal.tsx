import useModal from "../../hooks/useModal";
import * as S from "./CartModal.styles";

const CartModal = () => {
  const { closeModal } = useModal();

  return (
    <>
      <S.Title>장바구니</S.Title>
      <S.Button onClick={closeModal}>닫기</S.Button>
    </>
  );
};

export default CartModal;
