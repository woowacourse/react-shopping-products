import Layout from '../../components/Layout/Layout';
import ProductHeader from '../../components/product/ProductHeader';
import ProductItem from '../../components/product/ProductItem';
import Dropdown from '../../components/common/Dropdown';
import FloatingButton from '../../components/common/FloatingButton';

import useProducts from '../../hooks/useProducts/useProducts';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import useFilterAndSort from '../../hooks/useFilterAndSort';

import { CATEGORY_LIST, SORTING_LIST } from '../../constants/optionList';
import * as S from './ProductListPage.style';

import EmptyCart from '../../assets/EmptyCart.png';
import Loading from '../../assets/loading.gif';

const ProductListPage = () => {
  const { category, sort, handleCategory, handleSort } = useFilterAndSort();
  const { products, loading, error, isLast, handlePage } = useProducts(category, sort);
  const targetRef = useIntersectionObserver(handlePage);

  const isAddPageAble = !error && !isLast;

  return (
    <Layout>
      <Layout.Header>
        <ProductHeader />
      </Layout.Header>

      <Layout.Content>
        <Layout.Title mainTitle="텐파의 쇼핑몰" />

        <S.DropdownContainer>
          <Dropdown options={CATEGORY_LIST} selectedOption={category} updateOption={handleCategory} />
          <Dropdown options={SORTING_LIST} selectedOption={sort} updateOption={handleSort} />
        </S.DropdownContainer>

        {products.length > 0 ? (
          <S.ProductList>
            {products.map((product, index) => (
              <ProductItem key={`${product.id}-${index}`} product={product} />
            ))}
          </S.ProductList>
        ) : (
          <S.EmptyProductContainer>
            <img src={EmptyCart} alt="빈 상품 목록" />
            <p>표시할 상품이 없습니다.</p>
          </S.EmptyProductContainer>
        )}

        {isAddPageAble && (
          <S.LoadingWrapper ref={targetRef}>
            {loading && <S.LoadingSpinner src={Loading} alt="로딩 스피너" />}
          </S.LoadingWrapper>
        )}
      </Layout.Content>
      <FloatingButton />
    </Layout>
  );
};

export default ProductListPage;
