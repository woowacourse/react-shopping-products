import { css } from '@emotion/css';
import { MouseEvent, PropsWithChildren } from 'react';

const ModalBackdrop: React.FC<PropsWithChildren & { onClose: () => void }> = ({
  children,
  onClose,
}) => {
  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={backdropStyles}
      onClick={handleBackdropClick}
      data-testid="modal-backdrop"
    >
      {children}
    </div>
  );
};

export default ModalBackdrop;

const backdropStyles = css`
  width: 100dvw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 0;
  left: 0;
  top: 0;
`;
