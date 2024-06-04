import { CartItemProvider } from '../../context/CartItemProvider';
import { ToastProvider } from '../../context/ToastProvider';
import * as S from './style';

import { PropsWithChildren } from 'react';

const GlobalLayout = ({ children }: PropsWithChildren) => {
  return (
    <ToastProvider>
      <CartItemProvider>
        <S.Container>{children}</S.Container>
      </CartItemProvider>
    </ToastProvider>
  );
};

export default GlobalLayout;
