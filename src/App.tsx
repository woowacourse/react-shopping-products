import Navbar from './widgets/navbar/ui/Navbar';
import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from './features/products/api/getProducts';
import { Product } from './features/products/type/product';
import { filterByValue } from './shared/utils/filterByValue';
import { matchCategory } from './features/products/utils/matchCategory';

type Category = 'all' | 'food' | 'clothes';

const CATEGORY_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '식료품', value: 'food' },
  { label: '패션잡화', value: 'clothes' },
];

const FILTER_OPTIONS = [
  { label: '필터', value: '' },
  { label: '높은 가격순', value: 'price,desc' },
  { label: '낮은 가격순', value: 'price,asc' },
];

function App() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [category, setCategory] = useState<Category>('all');
  const [sortValue, setSortValue] = useState('');

  const isError = error !== '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts({ sortValue });

        const products = response.content;
        const totalElements = response.totalElements;
        const totalPages = response.totalPages;

        setPageInfo({ totalElements, totalPages });
        setProducts(products);
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sortValue]);

  const filteredProducts = filterByValue({
    array: products,
    compare: 'category',
    value: matchCategory[category],
  });

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <S.ProductListWrapper>
      <S.ProductListHeader>
        <S.ProductListHeaderTitle>WoowaBros Product List</S.ProductListHeaderTitle>

        <S.ProductListFilterContainer>
          <CustomSelect items={CATEGORY_OPTIONS} onChange={(e) => setCategory(e.target.value as Category)} />
          <CustomSelect
            items={FILTER_OPTIONS}
            onChange={(e) => {
              setSortValue(e.target.value);
            }}
          />
        </S.ProductListFilterContainer>
      </S.ProductListHeader>

      {isLoading ? (
        <div>loading...</div>
      ) : (
        <S.ProductList>
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.ProductList>
      )}
    </S.ProductListWrapper>
  );
}

export default App;
