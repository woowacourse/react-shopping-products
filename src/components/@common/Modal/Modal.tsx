import { PropsWithChildren } from "react";
import Portal from "../Portal/Portal";
import * as S from "./Modal.styles";

type Props = PropsWithChildren<{
  isOpen: boolean;
  onClose: () => void;
}>;

const Modal = ({ isOpen, onClose, children }: Props) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {isOpen && (
        <Portal>
          <S.ModalBackdrop onClick={onClose}>
            <S.ModalContainer onClick={stopPropagation}>
              <S.ModalContent>{children}</S.ModalContent>
            </S.ModalContainer>
          </S.ModalBackdrop>
        </Portal>
      )}
    </>
  );
};

export default Modal;
