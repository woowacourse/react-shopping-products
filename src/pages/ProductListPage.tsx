import Header from '@/components/Header/Header';
import Title from '@/components/common/Title/Title';
import Flex from '@/components/common/Flex/Flex';
import { CATEGORY_OPTION_LIST, FILTER_OPTION_LIST } from '@/constants/filter';
import ProductList from '@/components/ProductList/ProductList';
import styles from './ProductListPage.module.css';
import CartIcon from '@/components/CartIcon/CartIcon';
import DropdownUl from '@/components/DropdownUl/DropdownUl';
import InfiniteScrollObserver from '@/components/InfiniteScrollObserver/InfiniteScrollObserver';
import CartItemProvider from '@/provider/CartItemProvider';
import useProductList from '@/hooks/useProductList';

export default function ProductListPage() {
  const { productList, handleNextPage, handleCategory, handleSortType, hasNextPage } =
    useProductList();

  return (
    <CartItemProvider>
      <InfiniteScrollObserver hasMore={hasNextPage} loadMore={handleNextPage}>
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
                <DropdownUl
                  optionList={CATEGORY_OPTION_LIST}
                  bannerText={CATEGORY_OPTION_LIST[0].option}
                  onChange={handleCategory}
                />
                <DropdownUl
                  optionList={FILTER_OPTION_LIST}
                  bannerText="낮은 가격순"
                  onChange={handleSortType}
                />
                {/* <FilterDropdown /> */}
              </Flex>
            </div>

            {productList && <ProductList productList={productList} />}
          </Flex>
        </div>
      </InfiniteScrollObserver>
    </CartItemProvider>
  );
}
