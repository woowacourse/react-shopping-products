import styled from '@emotion/styled';
import { useModal } from './ModalProvider';

interface ModalOverlayProps {
  onClick?: () => void;
}

function ModalOverlay({ onClick }: ModalOverlayProps) {
  const { setOpen } = useModal();

  return (
    <StyledModalOverlay
      onClick={() => {
        setOpen(false);
        onClick?.();
      }}
    />
  );
}

export default ModalOverlay;

const StyledModalOverlay = styled.div`
  background-color: rgba(0, 0, 0, 0.35);
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
`;
