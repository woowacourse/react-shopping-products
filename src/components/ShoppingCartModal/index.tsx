import ModalBackdrop from './ModalBackdrop';
import ModalHeader from './ModalHeader';
import useModalKeyboard from '../../hooks/useModalKeyboard';
import { css } from '@emotion/css';

interface ShoppingCartModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ShoppingCartModal = ({
  children,
  isOpen,
  onClose,
}: ShoppingCartModalProps) => {
  useModalKeyboard(onClose);

  if (!isOpen) return null;

  return (
    <ModalBackdrop onClose={onClose}>
      <div
        className={ModalFrame}
        data-testid="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-body"
      >
        <ModalHeader title={'장바구니'} />
        {children}
      </div>
    </ModalBackdrop>
  );
};

export default ShoppingCartModal;

const ModalFrame = css`
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 430px;
  max-height: 80dvh;
  border-radius: 8px 8px 0 0;
  position: absolute;
  bottom: 0;
`;
