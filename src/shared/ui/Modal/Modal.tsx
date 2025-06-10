import Portal from "../Portal/Portal";
import * as S from "./Modal.styles";

type Props = React.PropsWithChildren<{
  open: boolean;
  onClose: () => void;
}>;

const Modal = ({ open, onClose, children }: Props) => {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      {open && (
        <Portal>
          <S.ModalBackdrop onClick={onClose} data-testid="modal-backdrop">
            <S.ModalContainer
              onClick={stopPropagation}
              data-testid="modal-container"
            >
              <S.ModalContent>{children}</S.ModalContent>
            </S.ModalContainer>
          </S.ModalBackdrop>
        </Portal>
      )}
    </>
  );
};

export default Modal;
