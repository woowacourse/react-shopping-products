import useProducts from '../hooks/useProducts';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

import NavigationBar from '../components/NavigationBar/NavigationBar';
import SelectBox from '../components/SelectBox/SelectBox';
import ProductItemContainer from '../components/ProductItemContainer/ProductItemContainer';

import * as Styled from './ProductPage.style';

import {
  CategoryKeys,
  SortOptionsKeys,
  PRODUCT_CATEGORIES,
  PRODUCT_SORT_OPTIONS,
} from '../constants/products';
import APIErrorToast from '../components/APIErrorToast/APIErrorToast';

export default function ProductPage() {
  const {
    products,
    error,
    isLoading,
    fetchNextPage,
    handleChangeCategory,
    handleChangeSortOption,
  } = useProducts();

  const observerRef = useIntersectionObserver<HTMLDivElement>(fetchNextPage);

  const handleSelectCategory = (value: CategoryKeys) => {
    handleChangeCategory(PRODUCT_CATEGORIES[value]);
  };

  const handleSelectSortOption = (value: SortOptionsKeys) => {
    handleChangeSortOption(PRODUCT_SORT_OPTIONS[value]);
  };

  return (
    <>
      <NavigationBar>
        <Styled.ShopHeader>
          SHOP
          <Styled.CartButton />
        </Styled.ShopHeader>
      </NavigationBar>
      <Styled.ShopContent>
        <Styled.ShopTitle>bpple 상품 목록</Styled.ShopTitle>
        <Styled.SelectBoxContainer>
          <SelectBox<CategoryKeys>
            optionValues={Object.keys(PRODUCT_CATEGORIES)}
            onChange={handleSelectCategory}
            placeholder="전체"
          />
          <SelectBox<SortOptionsKeys>
            optionValues={Object.keys(PRODUCT_SORT_OPTIONS)}
            onChange={handleSelectSortOption}
            placeholder="낮은 가격순"
          />
        </Styled.SelectBoxContainer>
        <ProductItemContainer products={products} />
      </Styled.ShopContent>
      {!isLoading && !error && <Styled.ObserverTarget ref={observerRef} />}
      {error && error instanceof Error && <APIErrorToast message={error.message} />}
    </>
  );
}
