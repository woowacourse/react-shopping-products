import styled from "@emotion/styled";

import { useModalContext } from "../../../hooks/useModalContext";

type ModalBackdropProps = {
  closeByBackdrop?: boolean;
};

const ModalBackdrop = ({ closeByBackdrop = true }: ModalBackdropProps) => {
  const { onClose, $zIndex = 1000 } = useModalContext();

  const handleCloseModal = () => {
    if (closeByBackdrop) {
      onClose();
    }
  };

  return (
    <StyledBackDrop
      onClick={handleCloseModal}
      aria-hidden="true"
      backdropZIndex={$zIndex}
    />
  );
};

export default ModalBackdrop;

const StyledBackDrop = styled.div<{ backdropZIndex: number }>`
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ backdropZIndex }) => backdropZIndex};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(31, 41, 55, 0.2);
`;
