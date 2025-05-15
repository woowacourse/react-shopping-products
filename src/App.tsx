import * as S from './App.styles';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import { useEffect, useState } from 'react';
import { Product } from './features/products/type/product';
import { filterByValue } from './shared/utils/filterByValue';
import { matchCategory } from './features/products/utils/matchCategory';
import Navbar from './widgets/navbar/ui/Navbar';
import useGetProductsWithCart from './features/products/hooks/useGetProductsWithCart';

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
  const [category, setCategory] = useState<Category>('all');
  const [sortValue, setSortValue] = useState('');

  const { products, fetchProducts, isLoading, error } = useGetProductsWithCart(sortValue);

  const cartQuantity = products.filter((product) => product.isCart).length;

  useEffect(() => {
    fetchProducts();
  }, [sortValue]);

  // useEffect에 넣는 것은 어떤지
  const filteredProducts = filterByValue<Product, 'category'>({
    array: products,
    compare: 'category',
    value: matchCategory[category],
  });

  return (
    <>
      <Navbar cartQuantity={cartQuantity} errorMessage={error} />
      <S.ProductListWrapper>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>WoowaBros Product List</S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect items={CATEGORY_OPTIONS} onChange={(e) => setCategory(e.target.value as Category)} />
            <CustomSelect items={FILTER_OPTIONS} onChange={(e) => setSortValue(e.target.value)} />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        {isLoading ? (
          <div>loading...</div>
        ) : (
          <S.ProductList>
            {filteredProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} onRefetch={fetchProducts} cartQuantity={cartQuantity} />
            ))}
          </S.ProductList>
        )}
      </S.ProductListWrapper>
    </>
  );
}

export default App;
