import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import useProductsWithPagination from '@hooks/product/useProductsWithPagination/useProductsWithPagination';
import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

import * as Styled from './ProductContent.styled';

import { INIT_PAGE } from '@hooks/product/useProductsWithPagination/useProductsWithPagination.constant';
import CardList from '@components/product/CardList/CardList';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';
import TargetObserver from '@components/common/TargetObserver/TargetObserver';

interface ProductContentProps {
  dropdownOptions: ProductDropdownOptions;
}

const ProductContent = ({ dropdownOptions }: ProductContentProps) => {
  const showToast = useToastContext();

  const { products, isLoading, updateNextProductItem, page } = useProductsWithPagination({
    dropdownOptions,
    showToast,
  });

  return (
    <TargetObserver onIntersect={updateNextProductItem}>
      <Styled.ProductPageListWrapper>
        <CardList products={products} />
      </Styled.ProductPageListWrapper>

      {page > INIT_PAGE && isLoading && <LoadingSpinner $width="100%" $height="30vh" />}
    </TargetObserver>
  );
};

export default ProductContent;
