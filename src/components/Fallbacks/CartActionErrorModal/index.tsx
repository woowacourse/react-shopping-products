import useToastModalPosition from '@hooks/useToastModalPosition';
import { ToastModal } from 'badahertz52-react-modules-components';
import { useLayoutEffect, useState } from 'react';

import CartActionError from '../CartActionError';

interface CartActionErrorModalProps {
  error: boolean;
}

const CartActionErrorModal = ({ error }: CartActionErrorModalProps) => {
  const rootEl = document.getElementById('root');

  const { toastModalPosition } = useToastModalPosition({
    targetEl: document.getElementsByTagName('header')[0],
    placement: 'bottom',
  });

  const [isOpenModal, setIsOpenToastModal] = useState(false);

  useLayoutEffect(() => {
    setIsOpenToastModal(error);
  }, [error]);

  return (
    <>
      {toastModalPosition && (
        <ToastModal
          openModal={isOpenModal}
          setOpenModal={setIsOpenToastModal}
          position={toastModalPosition}
          modalTargetEl={rootEl}
          toastDuration={3000}
          isNeedAnimation={true}
          animationDuration={2500}
        >
          <CartActionError />
        </ToastModal>
      )}
    </>
  );
};

export default CartActionErrorModal;
