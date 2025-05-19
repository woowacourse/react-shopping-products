import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from './features/products/type/product';
import { filterByValue } from './shared/utils/filterByValue';
import { MATCH_CATEGORY } from './features/products/utils/matchCategory';
import Navbar from './widgets/navbar/ui/Navbar';
import useGetProductsWithCart from './features/products/hooks/useGetProductsWithCart';
import ProductCardSkeleton from './features/products/ui/ProductCardSkeleton';

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
  const [sortValue, setSortValue] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  const { products, fetchProducts, error, isLoading } = useGetProductsWithCart(sortValue);
  if (error !== '') {
    setErrors(error);
  }

  const cartTypeQuantity = products.filter((product) => product.isCart).length;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
      <Navbar cartTypeQuantity={cartTypeQuantity} errorMessage={errors} />
      <S.ProductListWrapper>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>WoowaBros Product List</S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect
              id='category-select'
              items={CATEGORY_OPTIONS}
              onChange={(e) => setCategory(e.target.value as Category)}
            />
            <CustomSelect id='sort-select' items={SORT_OPTIONS} onChange={(e) => setSortValue(e.target.value)} />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        {isLoading ? (
          <S.ProductList>
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </S.ProductList>
        ) : (
          <S.ProductList>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onRefetch={fetchProducts} setErrors={setErrors} />
            ))}
          </S.ProductList>
        )}
      </S.ProductListWrapper>
    </>
  );
}

export default App;
