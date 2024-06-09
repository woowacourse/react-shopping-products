import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProductsWithPagination from '@hooks/product/useProductsWithPagination/useProductsWithPagination';
import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

import * as Styled from './ProductContent.styled';

import { INIT_PAGE } from '@hooks/product/useProductsWithPagination/useProductsWithPagination.constant';
import CardList from '@components/product/CardList/CardList';
import { useToastContext } from '@components/common/Toast/provider/ToastProvider';

interface ProductContentProps {
  dropdownOptions: ProductDropdownOptions;
}

// TODO: IntersectionObserver 관련 책임을 관련 컴포넌트로 위임 시키기
const ProductContent = ({ dropdownOptions }: ProductContentProps) => {
  const showToast = useToastContext();

  const { products, isLoading, updateNextProductItem, page } = useProductsWithPagination({
    dropdownOptions,
    showToast,
  });

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => {
      updateNextProductItem();
    },
  });

  return (
    <>
      <Styled.ProductPageListWrapper>
        <CardList products={products} />
      </Styled.ProductPageListWrapper>

      {page > INIT_PAGE && isLoading && <LoadingSpinner $width="100%" $height="30vh" />}

      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default ProductContent;
