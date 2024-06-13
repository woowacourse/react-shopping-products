import { ReactNode } from 'react';
import * as S from './style';

interface QuantityTextProps {
  children: ReactNode;
}

const QuantityText = ({ children }: QuantityTextProps) => {
  return <S.QuantityText>{children}</S.QuantityText>;
};

export default QuantityText;
