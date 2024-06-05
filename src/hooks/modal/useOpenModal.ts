import { useState } from 'react';

interface UseModalOpenParams {
  isOpenModal: boolean;
}

const useOpenModal = ({ isOpenModal }: UseModalOpenParams) => {
  const [openModal, setOpenModal] = useState(isOpenModal);
  const rootEl = document.getElementById('root');

  return { openModal, setOpenModal, rootEl };
};

export default useOpenModal;
