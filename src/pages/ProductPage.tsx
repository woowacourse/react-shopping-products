import { useState } from 'react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SelectDropdownContainer from '../components/SelectDropdown/SelectDropdownContainer';
import ErrorMessage from '../components/ErrorMessage';
import DotWaveSpinner from '../components/DotWaveSpinner';
import { CategoryKey, SortKey, CATEGORY_KEYS, SORT_KEYS } from '../types/selectOptions';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchCartItems } from '../hooks/useFetchCartItems';
import { useError } from '../context/ErrorContext';
import { Container } from '../styles/common';
import { ProductCardContainer } from '../styles/ProductCard';
import Modal from '../components/Modal/Modal';

function ProductPage() {
  const [category, setCategory] = useState<CategoryKey>(CATEGORY_KEYS[0]);
  const [sort, setSort] = useState<SortKey>(SORT_KEYS[0]);

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
  } = useFetchProducts({
    category,
    sort,
  });

  const { error: cartError } = useFetchCartItems();
  const { errorMessage: contextErrorMessage } = useError();

  const handleCategoryChange = (category: CategoryKey) => {
    setCategory(category);
  };
  const handleSortChange = (sort: SortKey) => {
    setSort(sort);
  };

  const errorMessage = productsError || cartError || contextErrorMessage;

  return (
    <Container>
      <Modal />
      <Header />
      {errorMessage !== '' && <ErrorMessage errorMessage={errorMessage} />}
      {productsLoading && <DotWaveSpinner />}
      {!productsLoading && (
        <>
          <SelectDropdownContainer
            category={category}
            sort={sort}
            handleCategoryChange={handleCategoryChange}
            handleSortChange={handleSortChange}
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
              />
            ))}
          </ProductCardContainer>
        </>
      )}
    </Container>
  );
}

export default ProductPage;
