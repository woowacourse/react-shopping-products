import { createPortal } from "react-dom";
import getShoppingCart from "../../api/getShoppingCart";
import { useAPI } from "../../domain/contexts/APIContext";
import { StyledDiv } from "../../styles/Common/ErrorBox.styles";
import {
  StyledModalBackground,
  StyledModalBody,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalItem,
  StyledModalList,
} from "../../styles/Common/Modal.styles";
import { StyledSpinnerWrapper } from "../../styles/Product/ProductListContainer.styles";
import ErrorBox from "./ErrorBox";
import Spinner from "./Spinner";

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
  const { data, status } = useAPI({
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

  const modalContent = (
    <div>
      <StyledModalBackground isModalOpen={isModalOpen}>
        <StyledModalContainer>
          <StyledModalHeader>
            <h4>장바구니</h4>
          </StyledModalHeader>
          <StyledModalBody>
            <StyledModalList>
              {data.content.map((item: CartItem) => (
                <StyledModalItem key={item.id}>
                  <span>{item.quantity}</span>
                  <div>{item.product.name}</div>
                </StyledModalItem>
              ))}
            </StyledModalList>
            <button onClick={onClose}>닫기</button>
          </StyledModalBody>
        </StyledModalContainer>
      </StyledModalBackground>
    </div>
  );

  return createPortal(modalContent, document.body);
}
