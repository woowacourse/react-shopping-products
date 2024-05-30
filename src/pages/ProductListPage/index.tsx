import { fetchProduct } from '@apis/index';
import { CartItem, Filtering, Product } from '@appTypes/index';
import { Dropdown, IntersectionObserverArea } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import { useFilteredProducts, useStackProducts } from '@hooks/index';
import useFetch from '@hooks/useFetch';
import { useEffect, useRef, useState } from 'react';

import ProductList from './ProductList';
import style from './style.module.css';

interface ProductListPageProps {
  cartItems: CartItem[];
}

function ProductListPage({ cartItems }: ProductListPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { fetch, loading, error } = useFetch<typeof fetchProduct>(fetchProduct);

  const { getStackedProducts } = useStackProducts({
    fetch,
    products,
    filtering,
    isLast: isLastPage,
    productLength: products.length,
  });
  const { getFilteredProducts } = useFilteredProducts({
    fetch,
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

  const observerCallback = async (entries: IntersectionObserverEntry[]) => {
    if (!entries[0].isIntersecting) return;

    const result = await getStackedProducts(page);
    if (!result) return;

    updateState(result);
  };

  const handleFilteringProducts = async () => {
    const result = await getFilteredProducts();
    if (!result) return;

    updateState(result);
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFiltering((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    handleFilteringProducts();
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
        <ProductList products={products} targetRef={targetRef} loading={loading} cartItems={cartItems} />
      </IntersectionObserverArea>
    </div>
  );
}

export default ProductListPage;
