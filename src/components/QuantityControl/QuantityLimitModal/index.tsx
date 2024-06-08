import { useOpenModal } from '@src/hooks';
import { AlertModal } from 'badahertz52-react-modules-components';
import { Dispatch, SetStateAction } from 'react';

import style from './style.module.css';

interface QuantityLimitModalProps {
  isTryOverMaxQuantity: boolean;
  setIsTryOverMaxQuantity: Dispatch<SetStateAction<boolean>>;
}
const QuantityLimitModal = ({ isTryOverMaxQuantity, setIsTryOverMaxQuantity }: QuantityLimitModalProps) => {
  const { rootEl } = useOpenModal({ isOpenModal: isTryOverMaxQuantity });

  return (
    <AlertModal
      openModal={isTryOverMaxQuantity}
      closeModal={() => setIsTryOverMaxQuantity(false)}
      modalTargetEl={rootEl}
      contents={<p className={style.message}>상품은 최대 100개까지 구매가능해요.</p>}
      button={<button className={style.confirmButton}>확인</button>}
    />
  );
};

export default QuantityLimitModal;
