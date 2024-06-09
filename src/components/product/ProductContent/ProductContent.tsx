import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProductsWithPagination from '@hooks/product/useProductsWithPagination/useProductsWithPagination';
import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

import * as Styled from './ProductContent.styled';

import { INIT_PAGE } from '@hooks/product/useProductsWithPagination/useProductsWithPagination.constant';
import CardList from '@components/product/CardList/CardList';

interface ProductContentProps {
  dropdownOptions: ProductDropdownOptions;
}

const ProductContent = ({ dropdownOptions }: ProductContentProps) => {
  const { products, isLoading, updateNextProductItem, page } =
    useProductsWithPagination(dropdownOptions);

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
