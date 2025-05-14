import Navbar from './widgets/navbar/ui/Navbar';
import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import { useEffect, useState } from 'react';
import { getProducts } from './features/products/api/getProducts';
import { Product } from './features/products/type/product';

const CATEGORY_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '의류', value: 'clothes' },
  { label: '신발', value: 'shoes' },
  { label: '가방', value: 'bags' },
];

const FILTER_OPTIONS = [
  { label: '필터', value: 'filter' },
  { label: '낮은 가격순', value: 'low' },
  { label: '높은 가격순', value: 'high' },
];

function App() {
  const [products, setProducts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    totalElements: 0,
    totalPages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isError = error !== '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();
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
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error}</div>;
  }

  return (
    <S.ProductListWrapper>
      <Navbar />

      <S.ProductListContainer>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>WoowaBros Product List</S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect items={CATEGORY_OPTIONS} />
            <CustomSelect items={FILTER_OPTIONS} />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        <S.ProductList>
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </S.ProductList>
      </S.ProductListContainer>
    </S.ProductListWrapper>
  );
}

export default App;
