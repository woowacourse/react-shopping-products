import Modal from '../../Modal.tsx';
import styled from '@emotion/styled';
import { Button } from '../Button';
import { useRef } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";

type ConfirmModalProps = {
  message: string;
  description?: string;
  onCancel: () => void;
  onConfirm: () => void;
  height?: string;
};

function ConfirmModal({ message, description, onCancel, onConfirm, height = "157px" }: ConfirmModalProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const { containerRef, handleKeyDown } = useFocusTrap({
    initialFocusRef: cancelButtonRef as React.RefObject<HTMLButtonElement>,
    onEscape: onCancel
  });

  return (
    <Modal
      position="center"
      onClose={onCancel}
      width="480px"
      height={height}
    >
      <Container ref={containerRef} onKeyDown={handleKeyDown}>
        <Message>{message}</Message>
        {description && <Description>{description}</Description>}
        <ButtonContainer>
          <Button variant="cancel" onClick={onCancel} ref={cancelButtonRef}>취소</Button>
          <Button variant="confirm" onClick={onConfirm}>확인</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

export default ConfirmModal;

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
    gap: 12px;
`;
