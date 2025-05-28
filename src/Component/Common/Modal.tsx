import { createPortal } from "react-dom";
import getShoppingCart from "../../api/getShoppingCart";
import { useAPI } from "../../domain/contexts/APIContext";
import { StyledDiv } from "../../styles/Common/ErrorBox.styles";
import * as S from "../../styles/Common/Modal.styles";
import ErrorBox from "./ErrorBox";
import QuantityController from "./QuantityController";
import { CartItemTypes } from "../../types/CartItemType";
import deleteShoppingCart from "../../api/deleteShoppingCart";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export default function Modal({ isModalOpen, onClose }: ModalProps) {
  const { data, status, refetch } = useAPI({
    fetcher: () => getShoppingCart(),
    name: "cart",
  });

  if (!isModalOpen) {
    return null;
  }

  if (status === "error") {
    return (
      <StyledDiv>
        <ErrorBox>오류가 발생했습니다. 잠시 후 다시 시도해 주세요.</ErrorBox>
      </StyledDiv>
    );
  }

  const totalPrice = data.content.reduce(
    (sum: number, { product, quantity }: CartItemTypes) => {
      return sum + product.price * quantity;
    },
    0
  );

  const handleDelete = async (productId: number) => {
    await deleteShoppingCart(productId);
    refetch();
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
              {data.content.map((item: CartItem) => (
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
                      refetch={refetch}
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
