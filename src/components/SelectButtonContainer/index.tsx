import * as S from './style';

import { ReactNode } from 'react';

interface SelectButtonContainerProps {
  children: ReactNode;
}

const SelectButtonContainer = ({ children }: SelectButtonContainerProps) => {
  return <S.SelectButtonContainer>{children}</S.SelectButtonContainer>;
};

export default SelectButtonContainer;
