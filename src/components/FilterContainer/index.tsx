import * as S from './style';

import { PropsWithChildren } from 'react';

const FilterContainer = ({ children }: PropsWithChildren) => {
  return <S.FilterContainer>{children}</S.FilterContainer>;
};

export default FilterContainer;
