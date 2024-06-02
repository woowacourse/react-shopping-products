import { fetchProduct } from '@apis/index';
import { CartItem, Filtering, Product } from '@appTypes/index';
import { Dropdown, IntersectionObserverArea } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import { useEffect, useRef, useState } from 'react';

import ProductList from './ProductList';
import style from './style.module.css';

interface ProductListPageProps {
  cartItems: CartItem[];
}

function ProductListPage({ cartItems }: ProductListPageProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isLast, setIsLast] = useState(false);
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });
  const targetRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const updateState = ({
    isLast,
    newProducts,
    newPage,
  }: {
    isLast: boolean;
    newProducts: Product[];
    newPage: number;
  }) => {
    setIsLast(isLast);
    setProducts(newProducts);
    setPage(newPage);
  };

  const callback = async () => {
    try {
      if (isLast || !products.length) return;
      setLoading(true);
      const newPage = page + 1;
      const result = await fetchProduct({ filtering, page: newPage });
      if (!result) return;
      updateState({ newPage, ...result, newProducts: [...products, ...result.products], isLast: result.isLast });
      setError('');
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFilteringProducts = async () => {
    try {
      setProducts([]);
      setLoading(true);
      const result = await fetchProduct({ filtering });
      updateState({ isLast: result.isLast, newProducts: result.products, newPage: 0 });
    } catch (error) {
      const errorMessage = (error as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
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
      <IntersectionObserverArea callback={callback} targetRef={targetRef}>
        <ProductList products={products} targetRef={targetRef} loading={loading} cartItems={cartItems} />
      </IntersectionObserverArea>
    </div>
  );
}

export default ProductListPage;
