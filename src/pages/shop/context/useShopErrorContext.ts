import { useContext } from 'react';
import { ShopErrorContext } from './ShopErrorProvider';

export function useShopErrorContext() {
  const context = useContext(ShopErrorContext);

  if (!context) {
    throw new Error('ShopErrorProvider 안에서 사용해주세요.');
  }
  return context;
}
