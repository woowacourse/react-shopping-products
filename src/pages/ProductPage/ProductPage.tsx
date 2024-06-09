import * as Styled from './ProductPage.styled';

import ProductDropdown from '@components/product/ProductDropdown/ProductDropdown';
import {
  PRODUCT_CATEGORY_MAP,
  PRODUCT_SORT_MAP,
} from '@components/product/ProductDropdown/ProductDropdown.constant';
import ProductContent from '@components/product/ProductContent/ProductContent';
import useSelectProductDropdown from '@hooks/product/useSelectProductDropdown';
import { Suspense } from 'react';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';

const ProductPage = () => {
  const { dropdownOptions, onSelectOption } = useSelectProductDropdown();

  return (
    <>
      <Styled.ProductPageTitle>bpple 상품 목록</Styled.ProductPageTitle>
      <Styled.ProductDropdownWrapper>
        <ProductDropdown<keyof typeof PRODUCT_CATEGORY_MAP>
          options={PRODUCT_CATEGORY_MAP}
          currentOption={dropdownOptions.category}
          type="category"
          onSelect={onSelectOption}
        />
        <ProductDropdown<keyof typeof PRODUCT_SORT_MAP>
          options={PRODUCT_SORT_MAP}
          currentOption={dropdownOptions.sort}
          type="sort"
          onSelect={onSelectOption}
        />
      </Styled.ProductDropdownWrapper>
      <Suspense fallback={<LoadingSpinner $width="100%" $height="75vh" />}>
        <ProductContent dropdownOptions={dropdownOptions} />
      </Suspense>
    </>
  );
};

export default ProductPage;
