import Header from '@/components/Header/Header';
import Title from '@/components/common/Title/Title';
import Flex from '@/components/common/Flex/Flex';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import ProductList from '@/components/ProductList/ProductList';
import useProductList from '@/hooks/useProductList';
import { useRef } from 'react';
import { useObserver } from '@/hooks/useObserver';
import styles from './ProductListPage.module.css';
import CartIcon from '@/components/CartIcon/CartIcon';
import LoadingSpinner from '@/components/common/LoadingSpinner/LoadingSpinner';
import Dropdown from '@/components/Dropdown/Dropdown';

export default function ProductListPage() {
  const { productList, handleCategory, handleSortType, loading, fetchNextPage } = useProductList();

  const bottom = useRef(null);

  const onIntersect = ([entry]: IntersectionObserverEntry[]) =>
    !loading && entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottom,
    onIntersect,
  });

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
        <ProductList productList={productList} />
      </Flex>

      <div ref={bottom} />
      {loading && <LoadingSpinner />}
    </div>
  );
}
