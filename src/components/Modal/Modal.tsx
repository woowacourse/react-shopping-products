import S from './Modal.module.css';

interface ModalProps {
  handleClose: () => void;
}

const Modal = ({ handleClose }: ModalProps) => {
  return (
    <div className={S.container}>
      <div data-testid="modal-overlay" className={S.overlay} onClick={handleClose} />
      <div className={S.content}>
        <p>장바구니</p>
        <button onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
