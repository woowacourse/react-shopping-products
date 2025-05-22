import { createContext, PropsWithChildren, useState } from "react";
import Modal from "../components/@common/Modal/Modal";
import CartModal from "../components/CartModal/CartModal";

type ModalType = "cart" | null;

interface ModalContextType {
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

export const ModalContext = createContext<ModalContextType | null>(null);

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => setModalType(type);
  const closeModal = () => setModalType(null);

  const modalContent = () => {
    switch (modalType) {
      case "cart":
        return <CartModal />;
      default:
        return null;
    }
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <Modal isOpen={modalType !== null} onClose={closeModal}>
        {modalContent()}
      </Modal>
    </ModalContext.Provider>
  );
};
