import { createPortal } from "react-dom";
import {
  StyledModalBackground,
  StyledModalContainer,
  StyledModalHeader,
  StyledModalBody,
  StyledModalList,
  StyledModalItem,
} from "../../styles/Common/Modal.styles";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export default function Modal({ isModalOpen, onClose }: ModalProps) {
  if (!isModalOpen) {
    return null;
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
              <StyledModalItem>1번</StyledModalItem>
              <StyledModalItem>2번</StyledModalItem>
              <StyledModalItem>3번</StyledModalItem>
            </StyledModalList>
            <button onClick={onClose}>닫기</button>
          </StyledModalBody>
        </StyledModalContainer>
      </StyledModalBackground>
    </div>
  );

  return createPortal(modalContent, document.body);
}
