import styled from "@emotion/styled";

import { BaseButton } from "./Modal.BaseButton.styled";

import closeIcon from "/Close.svg";
import { useModalContext } from "../../../hooks/useModalContext";

const ModalCloseButton = ({ $autoFocus = true }: { $autoFocus?: boolean }) => {
  const { onClose } = useModalContext();

  return (
    <StyledCloseButton
      type="button"
      onClick={onClose}
      aria-label="closeModalButton"
      autoFocus={$autoFocus}
    >
      <StyledCloseIcon src={closeIcon} alt="closeIcon" />
    </StyledCloseButton>
  );
};
export default ModalCloseButton;

const StyledCloseButton = styled(BaseButton)`
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 0;
  background-color: transparent;
  border: none;

  z-index: 0;
  &:hover {
    background-color: rgba(31, 41, 55, 0.1);
    border-radius: 20%;
  }
`;

const StyledCloseIcon = styled.img`
  width: 27px;
  height: 27px;
`;
