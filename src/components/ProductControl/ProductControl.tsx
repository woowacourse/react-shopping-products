import * as S from './ProductControl.styled';
import Select from '../common/Select/Select';
import { CategoryOptions, SortOptions } from '../../constants/selectOptions';
import { CategoryOptionType, ProductControlProps, SortOptionType } from './types';
import { useProductControl } from './hooks/useProductControl';

function ProductControl({ setProductList }: ProductControlProps) {
  const { handleSelectChange } = useProductControl(setProductList);

  return (
    <S.ProductControlContainer>
      <S.ProductControlTitle>bpple 상품목록</S.ProductControlTitle>
      <S.SelectContainer>
        <Select options={CategoryOptions} onChange={(value) => handleSelectChange(value as CategoryOptionType, 'category')} />
        <Select options={SortOptions} onChange={(value) => handleSelectChange(value as SortOptionType, 'sort')} />
      </S.SelectContainer>
    </S.ProductControlContainer>
  );
}

export default ProductControl;
