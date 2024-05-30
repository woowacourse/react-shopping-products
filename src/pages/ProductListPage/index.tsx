import { fetchProduct } from '@apis/index';
import { CartItem, Filtering, Product } from '@appTypes/index';
import { Dropdown, IntersectionObserverArea } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import { useStackProducts } from '@hooks/index';
import useFetch from '@hooks/useFetch';
import { useEffect, useRef, useState } from 'react';

import ProductList from './ProductList';
import style from './style.module.css';

interface ProductListPageProps {
  cartItems: CartItem[];
  getCartItemList: () => Promise<void>;
}

function ProductListPage({ cartItems, getCartItemList }: ProductListPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { fetch, loading, error } = useFetch<typeof fetchProduct>(fetchProduct);

  // TODO : 반복된느 로직 훅으로 빼기

  const { getStackedProducts } = useStackProducts({
    fetch,
    products,
    filtering,
  });

  const updateState = ({
    isLast,
    newProducts,
    newPage,
  }: {
    isLast: boolean;
    newProducts: Product[];
    newPage: number;
  }) => {
    setIsLastPage(isLast);
    setProducts(newProducts);
    setPage(newPage);
  };
  /**
   * 필터링이 변했을 때 상품 목록을 가져오는 기능
   */
  const getFilteredProducts = async () => {
    const result = await fetch({ filtering });
    if (result === undefined) return;

    setIsLastPage(result.isLast);
    setPage(0);
    setProducts(result.products);
  };

  const observerCallback = async (entries: IntersectionObserverEntry[]) => {
    if (!entries[0].isIntersecting || isLastPage || !products.length) return;

    const result = await getStackedProducts(page);
    if (!result) return;
    updateState(result);
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFiltering((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getFilteredProducts();
  }, [filtering]);

  useEffect(() => {
    if (error) {
      throw new Error('예기치 못한 에러 발생');
    }
  }, [error]);

  return (
    <div>
      <h1 className="page__title">bpple 상품 목록</h1>
      <div className={style.dropdownGroup}>
        <Dropdown label="카테고리" name="category" options={CATEGORY_OPTIONS} onChange={handleChangeOption} />
        <Dropdown label="가격순" name="sort" options={PRICE_SORT_OPTIONS} onChange={handleChangeOption} />
      </div>
      <IntersectionObserverArea callback={observerCallback} targetRef={targetRef}>
        <ProductList
          products={products}
          targetRef={targetRef}
          loading={loading}
          cartItems={cartItems}
          getCartItemList={getCartItemList}
        />
      </IntersectionObserverArea>
    </div>
  );
}

export default ProductListPage;
