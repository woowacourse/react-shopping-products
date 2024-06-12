import { useState } from 'react';

const useModal = (initialState = false) => {
  const [isModalOpen, setIsModalOpen] = useState(initialState);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return { isModalOpen, openModal, closeModal, toggleModal };
};

export default useModal;
