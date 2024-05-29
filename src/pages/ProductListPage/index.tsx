import { fetchProduct } from '@apis/index';
import { Filtering, Product } from '@appTypes/index';
import { Dropdown, IntersectionObserverArea } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import useFetch from '@hooks/useFetch';
import { useEffect, useRef, useState } from 'react';

import ProductList from './ProductList';
import style from './style.module.css';

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { fetch, loading, error } = useFetch<typeof fetchProduct>(fetchProduct);

  // TODO : 반복된느 로직 훅으로 빼기
  /**
   * 무한 스크롤 시 상품 목록을 추가해서 넣어주는 기능
   */
  const getStackedProducts = async () => {
    const newPage = page + 1;
    const result = await fetch({ filtering, page: newPage });
    console.log('length', result?.products.length);
    if (result === undefined) return;
    setIsLastPage(result.isLast);
    setProducts((prev) => [...prev, ...result.products]);
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

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (!entries[0].isIntersecting || isLastPage || !products.length) return;

    getStackedProducts();
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
        <ProductList products={products} targetRef={targetRef} loading={loading} />
      </IntersectionObserverArea>
    </div>
  );
}

export default ProductListPage;
