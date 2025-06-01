import { createPortal } from "react-dom";
import * as Error from "../../styles/Common/ErrorBox.styles";
import * as S from "../../styles/Common/Modal.styles";
import ErrorBox from "./ErrorBox";
import QuantityController from "./QuantityController";
import deleteShoppingCart from "../../api/shoppingCart/deleteShoppingCart";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  cartItems: {
    id: number;
    quantity: number;
    product: {
      id: number;
      name: string;
      price: number;
      imageUrl: string;
      category: string;
    };
  }[];
  cartStatus: "idle" | "loading" | "success" | "error";
  refetchCart: () => void;
}

export default function Modal({
  isModalOpen,
  onClose,
  cartItems,
  cartStatus,
  refetchCart,
}: ModalProps) {
  if (!isModalOpen) {
    return null;
  }

  if (cartStatus === "loading") {
    return (
      <Error.Div>
        <ErrorBox>장바구니 로딩 중…</ErrorBox>
      </Error.Div>
    );
  }

  if (status === "error") {
    return (
      <Error.Div>
        <ErrorBox>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</ErrorBox>
      </Error.Div>
    );
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleDelete = async (productId: number) => {
    try {
      await deleteShoppingCart(productId);
      refetchCart();
    } catch (err) {
      console.error("아이템 삭제 실패:", err);
    }
  };

  const modalContent = (
    <div>
      <S.ModalBackground isModalOpen={isModalOpen}>
        <S.ModalContainer>
          <S.ModalHeaderTitle>
            <h4>장바구니</h4>
          </S.ModalHeaderTitle>
          <S.ModalBody>
            <S.ModalList>
              {cartItems.map((item) => (
                <S.ModalItem key={item.id}>
                  <S.Modalimg
                    src={item.product.imageUrl}
                    alt={item.product.name}
                  />
                  <S.ModalItemInfo>
                    <S.ItemHeaderRow>
                      <S.ModalTitle>{item.product.name}</S.ModalTitle>
                      <button onClick={() => handleDelete(item.product.id)}>
                        <S.ModalDeleteImg
                          src="/assets/deleteButtonIcon.png"
                          alt="delete"
                        />
                      </button>
                    </S.ItemHeaderRow>
                    <S.ModalItemPrice>
                      {item.product.price.toLocaleString("ko")}원
                    </S.ModalItemPrice>
                    <QuantityController
                      productId={item.product.id}
                      count={item.quantity}
                      refetch={refetchCart}
                    />
                  </S.ModalItemInfo>
                </S.ModalItem>
              ))}
            </S.ModalList>
          </S.ModalBody>
          <S.ModalFooter>
            <S.ModalFooterTitle>총 결제 금액</S.ModalFooterTitle>
            <S.ModalTotalPrice>
              {totalPrice.toLocaleString("ko-KR")}원
            </S.ModalTotalPrice>
          </S.ModalFooter>
          <S.ModalCloseButton onClick={onClose}>닫기</S.ModalCloseButton>
        </S.ModalContainer>
      </S.ModalBackground>
    </div>
  );

  return createPortal(modalContent, document.body);
}
