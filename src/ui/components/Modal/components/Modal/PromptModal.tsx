import Modal from '../../Modal.tsx';
import styled from '@emotion/styled';
import { Button } from "../Button";
import { useRef, useState } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

type PromptModalProps = {
  message: string;
  placeholder?: string;
  onCancel: () => void;
  onConfirm: (input: string) => void;
};

function PromptModal({message, placeholder, onCancel, onConfirm}: PromptModalProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const {containerRef, handleKeyDown} = useFocusTrap({
    initialFocusRef: inputRef as React.RefObject<HTMLInputElement>,
    onEscape: onCancel
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }

  const handleConfirm = () => {
    onConfirm(input);
  }

  return (
    <Modal
      position="center"
      onClose={onCancel}
      width="480px"
      height="157px"
    >
      <Container ref={containerRef} onKeyDown={handleKeyDown}>
        <Message>{message}</Message>
        <Input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={handleInputChange}
          ref={inputRef}
        />
        <ButtonContainer>
          <Button variant="cancel" onClick={onCancel}>취소</Button>
          <Button variant="confirm" onClick={handleConfirm}>확인</Button>
        </ButtonContainer>
      </Container>
    </Modal>
  );
}

export default PromptModal;

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

const Input = styled.input`
    box-sizing: border-box;
    width: 100%;
    height: 32px;
    border-radius: 2px;
    gap: 8px;
    padding: 8px;
    margin: 16px 0 16px 0;
    border: 1.01px solid #000000;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    align-items: flex-end;
    gap: 12px;
`;

