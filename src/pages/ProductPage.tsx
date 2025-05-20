import { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SelectDropdownContainer from '../components/SelectDropdown/SelectDropdownContainer';
import ErrorMessage from '../components/ErrorMessage';
import DotWaveSpinner from '../components/DotWaveSpinner';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchCartItems } from '../hooks/useFetchCartItems';
import { CATEGORY, SORT } from '../constants/selectOption';
import { CategoryKey, SortKey, categoryQueryMap, sortQueryMap } from '../types/selectOptions';
import { Container } from '../styles/common';
import { ProductCardContainer } from '../styles/ProductCard';

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

  const {
    data: cartProductsIds,
    error: cartError,
    addToCart,
    removeFromCart,
  } = useFetchCartItems();

  const errorMessage = productsError || cartError;

  return (
    <Container>
      <Header cartCount={cartProductsIds.length} />
      {errorMessage !== '' && <ErrorMessage errorMessage={errorMessage} />}
      {productsLoading && <DotWaveSpinner />}
      {!productsLoading && (
        <>
          <SelectDropdownContainer
            category={category}
            sort={sort}
            setCategory={setCategory}
            setSort={setSort}
          />
          <ProductCardContainer>
            {products.map(({ id, name, category, price, imageUrl }) => (
              <ProductCard
                key={id}
                id={id}
                name={name}
                category={category}
                price={price}
                imageUrl={imageUrl}
                cartProductsIds={cartProductsIds}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </ProductCardContainer>
        </>
      )}
    </Container>
  );
}

export default ProductPage;
