import NotProduct from '@components/product/NotProduct/NotProduct';

import CardList from '@components/product/CardList/CardList';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProducts from '@hooks/product/useProducts/useProducts';
import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

import * as Styled from './ProductContent.styled';

interface ProductContentProps {
  dropdownOptions: ProductDropdownOptions;
}

const ProductContent = ({ dropdownOptions }: ProductContentProps) => {
  const { products, isLoading, updateNextProductItem } = useProducts(dropdownOptions);

  const targetRef = useIntersectionObserver<HTMLDivElement>({
    onIntersect: () => {
      updateNextProductItem();
    },
  });

  return (
    <>
      {products.length === 0 ? (
        <NotProduct />
      ) : (
        <Styled.ProductPageListWrapper>
          <CardList products={products} />
        </Styled.ProductPageListWrapper>
      )}

      {products.length !== 0 && isLoading && <LoadingSpinner $width="100%" $height="30vh" />}

      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default ProductContent;
