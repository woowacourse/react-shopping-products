import NotProduct from '@components/product/NotProduct/NotProduct';

import CardList from '@components/product/CardList/CardList';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProducts from '@hooks/product/useProducts/useProducts';
import { ProductDropdownOptions } from '@components/product/ProductDropdown/ProductDropdown.type';

import * as Styled from './ProductContent.styled';
import APIErrorToast from '@components/common/Toast/ErrorToast';

interface ProductContentProps {
  onToggleCart: (id: number) => void;
  isAddedCart: (id: number) => boolean;
  dropdownOptions: ProductDropdownOptions;
}

const ProductContent = ({ onToggleCart, isAddedCart, dropdownOptions }: ProductContentProps) => {
  const { products, isLoading, updateNextProductItem, error } = useProducts(dropdownOptions);

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
          <CardList products={products} onToggleCart={onToggleCart} isAddedCart={isAddedCart} />
        </Styled.ProductPageListWrapper>
      )}

      {products.length !== 0 && isLoading && <LoadingSpinner $width="100%" $height="30vh" />}

      {error && <APIErrorToast message={error?.message ?? ''} />}

      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default ProductContent;
