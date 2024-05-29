import * as S from './style';

import { PropsWithChildren } from 'react';

const GlobalLayout = ({ children }: PropsWithChildren) => {
  return <S.Container>{children}</S.Container>;
};

export default GlobalLayout;
