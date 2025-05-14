import { css } from '@emotion/css';
import SelectBox from '../../components/common/SelectBox/SelectBox';
// import Toast from '../../components/common/Toast/Toast';
import Header from '../../components/Header/Header';
import { useEffect, useState } from 'react';
import { ProductProps } from '../../types/product';
import ProductList from '../../components/ProductList/ProductList';

type productsOptionType = {
  category: string;
  sortKey: string;
  sortOrder: string;
};

const productPageContainer = css`
  width: 429px;
  margin: 0 auto;
`;

const productWrapper = css`
  padding: 20px;
`;

const productPageTitle = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  margin: 10px 0px;
`;

const selectBoxContainer = css`
  display: flex;
  gap: 150px;
  justify-content: space-between;
  margin: 20px 0px;
`;

async function getProducts({ category, sortKey, sortOrder }: productsOptionType) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/products?${
      category !== CATEGORY[0] ? `category=${category}` : ''
    }&page=0&size=20&sort=${sortKey}%2C${sortOrder}`,
  );

  if (!res.ok) {
    throw new Error('에러 발생');
  }
  const data = await res.json();
  return data.content;
}

const CATEGORY = ['전체', '식료품', '패션잡화'];
const SORT: { [key: string]: string } = {
  '낮은 가격 순': 'asc',
  '높은 가격 순': 'desc',
};

function ProductsPage() {
  const [products, setProducts] = useState<ProductProps[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [category, setCategory] = useState(CATEGORY[0]);
  const [sort, setSort] = useState('asc');

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const data = await getProducts({ category: category, sortKey: 'price', sortOrder: sort });
        setProducts(data);
      } catch (e) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [sort, category]);

  // console.log(products);

  const handleChangeSort = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSort(SORT[e.target.value]);
  };

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(e.target.value);
  };

  return (
    <div className={productPageContainer}>
      <Header />
      <div className={productWrapper}>
        <h1 className={productPageTitle}>bpple 상품 목록</h1>
        <div className={selectBoxContainer}>
          <SelectBox placeHolder={CATEGORY[0]} options={CATEGORY} onChange={handleChangeCategory} />
          <SelectBox
            placeHolder={Object.keys(SORT)[0]}
            options={Object.keys(SORT)}
            onChange={handleChangeSort}
          />
        </div>
        {/* <Toast text="안녕하세요" varient="error" />  */}
        {products && <ProductList products={products} />}
      </div>
    </div>
  );
}

export default ProductsPage;
