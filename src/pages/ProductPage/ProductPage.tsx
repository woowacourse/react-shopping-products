import * as Styled from './ProductPage.styled';

import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';

import CardList from '@components/product/CardList/CardList';
import NotProduct from '@components/product/NotProduct/NotProduct';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import useProducts from '@hooks/product/useProducts/useProducts';
import ProductDropdown from '@components/product/ProductDropdown/ProductDropdown';
import {
  PRODUCT_CATEGORY_MAP,
  PRODUCT_SORT_MAP,
} from '@components/product/ProductDropdown/ProductDropdown.constant';

interface ProductPageProps extends React.PropsWithChildren {
  onToggleCart: (id: number) => void;
  isAddedCart: (id: number) => boolean;
}

const ProductPage = ({ onToggleCart, isAddedCart }: ProductPageProps) => {
  const { products, dropdownOptions, isLoading, updateNextProductItem, onSelectOption } =
    useProducts();

  const targetRef = useIntersectionObserver<HTMLDivElement>({ onIntersect: updateNextProductItem });

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

      {products.length === 0 ? (
        <NotProduct />
      ) : (
        <Styled.ProductPageListWrapper>
          <CardList products={products} onToggleCart={onToggleCart} isAddedCart={isAddedCart} />
        </Styled.ProductPageListWrapper>
      )}

      {products.length !== 0 && isLoading && <LoadingSpinner $width="100%" $height="30vh" />}

      <Styled.ObserverTarget ref={targetRef} />
    </>
  );
};

export default ProductPage;
