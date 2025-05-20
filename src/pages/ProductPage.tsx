import { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SelectDropdownContainer from '../components/SelectDropdown/SelectDropdownContainer';
import ErrorMessage from '../components/ErrorMessage';
import DotWaveSpinner from '../components/DotWaveSpinner';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchCartItems } from '../hooks/useFetchCartItems';
import { CATEGORY, SORT } from '../constants/selectOption';
import { MAX_CART_COUNT } from '../constants/magicNumber';
import { Container } from '../styles/common';
import { ProductCardContainer } from '../styles/ProductCard';

type CategoryKey = (typeof CATEGORY)[number];
type SortKey = (typeof SORT)[number];

const categoryQueryMap: Record<CategoryKey, string | undefined> = {
  전체: undefined,
  식료품: '식료품',
  패션잡화: '패션잡화',
};

const sortQueryMap: Record<SortKey, string | undefined> = {
  '순서 없음': undefined,
  '낮은 가격순': 'price,asc',
  '높은 가격순': 'price,desc',
};

function ProductPage() {
  const [category, setCategory] = useState<CategoryKey>(CATEGORY[0]);
  const [sort, setSort] = useState<SortKey>(SORT[0]);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useFetchProducts({
    category,
    sort,
    categoryQueryMap,
    sortQueryMap,
  });

  const { data: cartProductsIds, isLoading: cartLoading, error: cartError } = useFetchCartItems();

  const isLoading = productsLoading || cartLoading;
  const errorMessage = productsError || cartError;

  return (
    <Container>
      <Header cartCount={cartProductsIds.length} />
      {errorMessage && <ErrorMessage />}
      {isLoading && <DotWaveSpinner />}
      <SelectDropdownContainer
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
      />
      <ProductCardContainer>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            imageUrl={product.imageUrl}
            isInCart={cartProductsIds.some((item) => item.productId === product.id)}
            cartId={cartProductsIds.find((item) => item.productId === product.id)?.cartId}
            isNotCartCountMAX={cartProductsIds.length < MAX_CART_COUNT}
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default ProductPage;
