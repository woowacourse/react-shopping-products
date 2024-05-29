import { fetchProduct } from '@apis/index';
import { Filtering, Product } from '@appTypes/index';
import { Dropdown } from '@components/index';
import { CATEGORY_OPTIONS, PRICE_SORT_OPTIONS } from '@constants/index';
import { useEffect, useState } from 'react';

import ProductList from './ProductList';
import style from './style.module.css';

function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [filtering, setFiltering] = useState<Filtering>({ category: '', sort: 'price,asc' });

  const getProducts = async () => {
    const result = await fetchProduct({ filtering, page });
    setProducts(result.products);
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setFiltering((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getProducts();
  }, [filtering, page]);

  return (
    <div>
      <h1 className="page__title">bpple 상품 목록</h1>
      <div className={style.dropdownGroup}>
        <Dropdown label="카테고리" name="category" options={CATEGORY_OPTIONS} onChange={handleChangeOption} />
        <Dropdown label="가격순" name="sort" options={PRICE_SORT_OPTIONS} onChange={handleChangeOption} />
      </div>
      <ProductList products={products} />
    </div>
  );
}

export default ProductListPage;
