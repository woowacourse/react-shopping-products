import * as S from './style';

import { PropsWithChildren } from 'react';

const ProductsContainer = ({ children }: PropsWithChildren) => {
  return <S.ProductsContainer>{children}</S.ProductsContainer>;
};

export default ProductsContainer;
