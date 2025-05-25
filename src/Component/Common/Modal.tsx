import { createPortal } from "react-dom";
import getShoppingCart from "../../api/getShoppingCart";
import { useAPI } from "../../domain/contexts/APIContext";
import { StyledDiv } from "../../styles/Common/ErrorBox.styles";
import {
  StyledModalBackground,
  StyledModalBody,
  StyledModalContainer,
  StyledModalList,
  StyledModalItem,
  StyledModalimg,
  StyledModalHeaderTitle,
  StyledModalItemInfo,
  StyledModalTitle,
  StyledModalItemPrice,
  StyledModalFooter,
  StyledModalFooterTitle,
  StyledModalTotalPrice,
  StyledModalCloseButton,
  StyledItemHeaderRow,
  StyledModalDeleteImg,
} from "../../styles/Common/Modal.styles";

import { StyledSpinnerWrapper } from "../../styles/Product/ProductListContainer.styles";
import ErrorBox from "./ErrorBox";
import Spinner from "./Spinner";
import QuantityController from "./QuantityController";
import { CartItemTypes } from "../../types/CartItemType";

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

  if (status === "loading" || status === "idle") {
    return (
      <StyledSpinnerWrapper>
        <Spinner size={100} color="red" />
      </StyledSpinnerWrapper>
    );
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

  const modalContent = (
    <div>
      <StyledModalBackground isModalOpen={isModalOpen}>
        <StyledModalContainer>
          <StyledModalHeaderTitle>
            <h4>장바구니</h4>
          </StyledModalHeaderTitle>
          <StyledModalBody>
            <StyledModalList>
              {data.content.map((item: CartItem) => (
                <StyledModalItem key={item.id}>
                  <StyledModalimg
                    src={item.product.imageUrl}
                    alt={item.product.name}
                  />
                  <StyledModalItemInfo>
                    <StyledItemHeaderRow>
                      <StyledModalTitle>{item.product.name}</StyledModalTitle>
                      <StyledModalDeleteImg
                        src="/assets/deleteButtonIcon.png"
                        alt="delete"
                      />
                    </StyledItemHeaderRow>
                    <StyledModalItemPrice>
                      {item.product.price.toLocaleString("ko")}원
                    </StyledModalItemPrice>
                    <QuantityController
                      productId={item.product.id}
                      count={item.quantity}
                      refetch={refetch}
                    />
                  </StyledModalItemInfo>
                </StyledModalItem>
              ))}
            </StyledModalList>
          </StyledModalBody>
          <StyledModalFooter>
            <StyledModalFooterTitle>총 결제 금액</StyledModalFooterTitle>
            <StyledModalTotalPrice>
              {totalPrice.toLocaleString("ko-KR")}원
            </StyledModalTotalPrice>
          </StyledModalFooter>
          <StyledModalCloseButton onClick={onClose}>
            닫기
          </StyledModalCloseButton>
        </StyledModalContainer>
      </StyledModalBackground>
    </div>
  );

  return createPortal(modalContent, document.body);
}
