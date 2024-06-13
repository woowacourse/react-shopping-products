import * as S from './style';

import { ReactNode } from 'react';

interface ShoppingCartItemsProps {
  children: ReactNode;
}

const ShoppingCartItems = ({ children }: ShoppingCartItemsProps) => {
  return <S.ShoppingCartItems>{children}</S.ShoppingCartItems>;
};

export default ShoppingCartItems;
