import Modal from '../../Modal.tsx';
import styled from '@emotion/styled';
import { Button } from '../Button';
import { useRef } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";

type AlertModalProps = {
  message: string;
  description?: string;
  onConfirm: () => void;
  height?: string;
};

function AlertModal({ message, description, onConfirm, height = "157px" }: AlertModalProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const { containerRef, handleKeyDown } = useFocusTrap({
    initialFocusRef: confirmButtonRef as React.RefObject<HTMLButtonElement>,
    onEscape: onConfirm
  });

  return (
    <Modal
      position="center"
      onClose={onConfirm}
      width="480px"
      height={height}
    >
      <Container ref={containerRef} onKeyDown={handleKeyDown}>
        <Message>{message}</Message>
        {description && <Description>{description}</Description>}
        <ButtonContainer>
          <Button variant="confirm" onClick={onConfirm} ref={confirmButtonRef}>확인</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

export default AlertModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Message = styled.p`
    margin: 0;
    font-weight: 700;
    font-size: 18px;
    line-height: 100%;
    vertical-align: middle;
`;

const Description = styled.p`
    margin: 16px 0 16px 0;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    vertical-align: middle;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: flex-end;
`;

