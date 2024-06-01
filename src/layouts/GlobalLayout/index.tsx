import { CartItemProvider } from '../../context/CartItemProvider';
import * as S from './style';

import { PropsWithChildren } from 'react';

const GlobalLayout = ({ children }: PropsWithChildren) => {
  return (
    <CartItemProvider>
      <S.Container>{children}</S.Container>
    </CartItemProvider>
  );
};

export default GlobalLayout;
