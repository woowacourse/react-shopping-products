declare module 'woowacourse-react-modal-component' {
  export const useModal: () => {
    isOpen: boolean;
    toggleModal: () => void;
  };
}
