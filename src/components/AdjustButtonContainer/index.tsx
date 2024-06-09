import * as S from './style';

import { ReactNode } from 'react';

interface AdjustButtonContainerProps {
  children: ReactNode;
}

const AdjustButtonContainer = ({ children }: AdjustButtonContainerProps) => {
  return <S.AdjustButtonContainer>{children}</S.AdjustButtonContainer>;
};

export default AdjustButtonContainer;
