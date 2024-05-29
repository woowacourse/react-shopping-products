import * as S from './style';

import { PropsWithChildren } from 'react';

export const Header = ({ children }: PropsWithChildren) => {
  return <S.Header>{children}</S.Header>;
};
