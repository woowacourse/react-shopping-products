import { PAGE_INFORMATION } from '../../../constants/page';
import { CATEGORY, SORT } from '../../../constants/filterOptions';
import ProductList from '../../product/ProductList';
import Dropdown from '../../common/Dropdown';
import useProducts from '../../../hooks/useProducts';

import * as S from './style';
import * as C from '../../common/commonStyles';

export default function ProductPage() {
  const useProductsResult = useProducts();

  return (
    <S.Wrapper>
      <C.Title>{PAGE_INFORMATION.main.title}</C.Title>

      <S.FilterContainer>
        <Dropdown
          size="small"
          defaultContent={CATEGORY.defaultContent}
          options={CATEGORY.options}
          onSelect={useProductsResult.setCategory}
        />
        <Dropdown
          size="small"
          defaultContent={SORT.defaultContent}
          options={SORT.options}
          onSelect={useProductsResult.setSort}
        />
      </S.FilterContainer>

      <ProductList {...useProductsResult} />
    </S.Wrapper>
  );
}
