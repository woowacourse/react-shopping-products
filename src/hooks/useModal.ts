import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useState } from "react";

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { lockScroll, openScroll } = useBodyScrollLock();

  const onOpenModal = () => {
    setIsModalOpen(true);
    lockScroll();
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
    openScroll();
  };

  return {
    onOpenModal,
    onCloseModal,
    isModalOpen,
  };
};

export default useModal;
