import Header from '@/components/Header/Header';
import Title from '@/components/common/Title/Title';
import Flex from '@/components/common/Flex/Flex';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import styles from './ProductListPage.module.css';
import CartIcon from '@/components/CartIcon/CartIcon';
import Dropdown from '@/components/Dropdown/Dropdown';
import useProductListFilter from '@/hooks/product/useProductListFilter';
import ProductListContainer from './ProductListContainer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from '@/apis/ErrorComponent/ErrorComponent';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';

export default function ProductListPage() {
  const { handleCategory, handleSortType, category, sortType } = useProductListFilter();

  return (
    <div className={styles.container}>
      <Header leftComponent={<h1>SHOP</h1>} rightComponent={<CartIcon />} />

      <Flex gap={20} direction="column" style={{ margin: '30px' }}>
        <div className={styles.title_select_container}>
          <Title title="bpple 상품 목록" />

          <Flex
            gap={24}
            direction={'row'}
            style={{ justifyContent: 'space-between', marginTop: '24px' }}
          >
            <Dropdown
              optionList={CATEGORY_OPTION_LIST}
              bannerText="전체"
              onChange={handleCategory}
            />
            <Dropdown
              optionList={FILTER_OPTION_LIST}
              bannerText="낮은 가격순"
              onChange={handleSortType}
            />
          </Flex>
        </div>
        <ErrorBoundary FallbackComponent={ErrorComponent}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProductListContainer category={category} sortType={sortType} />
          </Suspense>
        </ErrorBoundary>
      </Flex>
    </div>
  );
}
