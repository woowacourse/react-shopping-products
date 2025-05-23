import { ReactNode } from 'react';
import { css } from '@emotion/react';
import Modal from './Modal/Modal';
import Button from '../Button/Button';

export default function DetailModal({ isOpen, onClose, title, content }: DetailModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} position="bottom" size="small">
      <Modal.BackDrop css={backdropCss} />
      <Modal.Content css={contentCss}>
        {Boolean(title) && <Modal.Title css={titleCss}>{title}</Modal.Title>}
        {content}
        <Modal.Footer css={buttonCss}>
          <Button onClick={onClose}>닫기</Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  content: ReactNode;
  confirmText?: string;
}

const backdropCss = css({
  backgroundColor: 'rgba(0, 0, 0, 0.35)'
});

const contentCss = css({
  width: '380px',
  backgroundColor: 'white',
  padding: '24px 32px',
  borderRadius: '8px',
  gap: '12px'
});

const titleCss = css({
  fontSize: '18px',
  fontWeight: '700',
  color: '#000'
});

const buttonCss = css({
  width: '100%'
});
