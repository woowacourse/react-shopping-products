import {MouseEvent, ReactNode} from 'react';
import * as S from '../ui/Modal.styles';

interface TitleProps {
  text?: string;
  color?: string;
  size?: number;
}

export interface ModalProps {
  position?: 'center' | 'bottom';
  title?: TitleProps;
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

const ModalHeader = ({title}: {title?: TitleProps}) => {
  return (
    <S.TopWrapper>
      {title && (
        <S.Title $color={title.color} $size={title.size}>
          {title.text}
        </S.Title>
      )}
    </S.TopWrapper>
  );
};

const Modal = ({
  position = 'center',
  title,
  children,
  isOpen,
  onClose,
}: ModalProps) => {
  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    isOpen && (
      <S.Backdrop $position={position} onClick={onClose}>
        <S.ModalContainer $position={position} onClick={stopPropagation}>
          <ModalHeader title={title} />
          {children}
        </S.ModalContainer>
      </S.Backdrop>
    )
  );
};

export default Modal;
