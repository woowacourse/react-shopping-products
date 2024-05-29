import * as S from './style';

import { PropsWithChildren } from 'react';

const Main = ({ children }: PropsWithChildren) => {
  return <S.Main>{children}</S.Main>;
};

export default Main;
