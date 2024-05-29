import * as S from './style';

import { PropsWithChildren } from 'react';

const Header = ({ children }: PropsWithChildren) => {
  return <S.Header>{children}</S.Header>;
};

export default Header;
