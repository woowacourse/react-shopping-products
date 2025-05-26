import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import { useEffect, useState } from 'react';
import { filterByValue } from './shared/utils/filterByValue';
import { MATCH_CATEGORY } from './features/products/utils/matchCategory';
import Navbar from './widgets/navbar/ui/Navbar';
import ProductCardSkeleton from './features/products/ui/ProductCardSkeleton';
import { useProductsWithCartContext } from './shared/contexts/productsWithCart/useProductsWithCartContext';
import { Product } from './shared/contexts/productsWithCart/types';

type Category = 'all' | 'food' | 'clothes';

const CATEGORY_OPTIONS = [
  { label: '전체', value: 'all' },
  { label: '식료품', value: 'food' },
  { label: '패션잡화', value: 'clothes' },
];

const SORT_OPTIONS = [
  { label: '필터', value: '' },
  { label: '높은 가격순', value: 'price,desc' },
  { label: '낮은 가격순', value: 'price,asc' },
];

function App() {
  const [category, setCategory] = useState<Category>('all');

  const { products, cartProducts, fetchProducts, error, setError, isLoading, setSortValue } =
    useProductsWithCartContext();

  useEffect(() => {
    const getProducts = async () => {
      try {
        await fetchProducts();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching products:', error);
          setError('데이터를 가져오는 중 오류가 발생했습니다.');
        }
      }
    };
    getProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (error !== '') {
      setError(error);
    }
  }, [error]);

  const filteredProducts =
    category === 'all'
      ? products
      : filterByValue<Product, 'category'>({
          array: products,
          compare: 'category',
          value: MATCH_CATEGORY[category],
        });

  return (
    <>
      <Navbar
        cartProducts={cartProducts}
        cartTypeQuantity={cartProducts.length}
        errorMessage={error}
        setError={setError}
      />
      <S.ProductListWrapper>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>WoowaBros Product List</S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect
              data-testid='category-select'
              id='category-select'
              items={CATEGORY_OPTIONS}
              onChange={(e) => setCategory(e.target.value as Category)}
            />
            <CustomSelect
              data-testid='sort-select'
              id='sort-select'
              items={SORT_OPTIONS}
              onChange={(e) => setSortValue(e.target.value)}
            />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        {isLoading && products.length === 0 ? (
          <S.ProductList>
            {Array.from({ length: 20 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </S.ProductList>
        ) : (
          <S.ProductList data-testid='product-list'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} setError={setError} />
            ))}
          </S.ProductList>
        )}
      </S.ProductListWrapper>
    </>
  );
}

export default App;
