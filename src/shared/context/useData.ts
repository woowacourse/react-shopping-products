import { useContext } from 'react';

import { ShoppingDataContext } from './ShoppingDataProvider';
import { ToastContext } from './ToastProvider';

export const useData = () => {
  const context = useContext(ShoppingDataContext);
  const { showToast } = useContext(ToastContext);

  if (!context) {
    showToast('현재 데이터를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
  }

  return context;
};
