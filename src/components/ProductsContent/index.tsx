import * as S from './style';

import { PropsWithChildren } from 'react';

const ProductsContent = ({ children }: PropsWithChildren) => {
  return <S.ProductsContent>{children}</S.ProductsContent>;
};

export default ProductsContent;
