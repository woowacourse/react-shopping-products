import Navbar from './widgets/navbar/ui/Navbar';
import CustomSelect from './shared/ui/CustomSelect';
import ProductCard from './features/products/ui/ProductCard';
import {filterByValue} from './shared/utils/filterByValue';
import {matchCategory} from './features/products/utils/matchCategory';
import {useEffect, useState} from 'react';
import {Product} from './features/products/type/product';
import * as S from './App.styles';
import {getProducts} from './features/products/api/getProducts';
import {getCartProduct} from './features/cart/api/getCartProduct';
import {useApi} from './features/products/provider/apiProvider';

type Category = keyof typeof matchCategory;

const CATEGORY_OPTIONS: {
  label: (typeof matchCategory)[keyof typeof matchCategory];
  value: Category;
}[] = [
  {label: '전체', value: 'all'},
  {label: '식료품', value: 'food'},
  {label: '패션잡화', value: 'clothes'},
];

const FILTER_OPTIONS = [
  {label: '필터', value: ''},
  {label: '높은 가격순', value: 'price,desc'},
  {label: '낮은 가격순', value: 'price,asc'},
];

function App() {
  const [category, setCategory] = useState<Category>('all');
  const [sortValue, setSortValue] = useState('');

  const {
    data: products,
    isLoading,
    refetch: refetchProducts,
  } = useApi(() => getProducts(sortValue), 'products');

  useEffect(() => {
    refetchProducts();
  }, [sortValue]);

  const {data: cartItems} = useApi(getCartProduct, 'cartItems');

  const filteredProducts = filterByValue<Product, 'category'>({
    array: products?.content || [],
    compare: 'category',
    value: matchCategory[category],
  });

  if (isLoading && !cartItems) {
    return <div>loading...</div>;
  }

  return (
    <>
      <Navbar cartQuantity={cartItems?.content.length} />
      <S.ProductListWrapper>
        <S.ProductListHeader>
          <S.ProductListHeaderTitle>
            WoowaBros Product List
          </S.ProductListHeaderTitle>

          <S.ProductListFilterContainer>
            <CustomSelect
              id="category-select"
              items={CATEGORY_OPTIONS}
              onChange={(e) => setCategory(e.target.value as Category)}
            />
            <CustomSelect
              id="sort-select"
              items={FILTER_OPTIONS}
              onChange={(e) => setSortValue(e.target.value)}
            />
          </S.ProductListFilterContainer>
        </S.ProductListHeader>

        <S.ProductList data-testid="product-list">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartQuantity={cartItems?.content.length}
              cartId={
                cartItems?.content.find(
                  (item) => item.product.id === product.id
                )?.id
              }
            />
          ))}
        </S.ProductList>
      </S.ProductListWrapper>
    </>
  );
}

export default App;
