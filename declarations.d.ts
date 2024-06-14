declare module 'woowacourse-react-modal-component' {
  export const useModal: () => {
    isOpen: boolean;
    toggleModal: () => void;
  };

  interface ModalProps {
    isOpen: boolean;
    toggleModal: () => void;
    position?: 'top' | 'center' | 'bottom';
    size?: 'small' | 'medium' | 'large';
    children?: React.ReactNode;
  }

  interface ModalHeaderProps {
    title: string;
    closeOption?: 'button' | 'none';
    handleCloseButton: () => void;
  }

  export const Modal: React.FC<ModalProps> & {
    Header: React.FC<ModalHeaderProps>;
  };
}
