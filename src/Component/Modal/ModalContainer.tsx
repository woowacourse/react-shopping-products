import { ReactElement } from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';
import { useModal } from './ModalProvider';

interface ModalContainerProps {
  children: ReactElement | ReactElement[];
  parentElement?: HTMLElement;
}

function ModalContainer({ children, parentElement }: ModalContainerProps) {
  const { open } = useModal();

  if (!open) {
    return null;
  }

  return createPortal(
    <StyledModal>{children}</StyledModal>,
    parentElement ?? document.body
  );
}

export default ModalContainer;

const StyledModal = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
