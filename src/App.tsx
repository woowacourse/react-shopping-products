import { Container } from './layouts/GlobalLayout/style';

import { useContext } from 'react';

import Header from './components/common/Header';
import Main from './components/common/Main';
import Dropdown from './components/common/Dropdown';
import Title from './components/common/Title';
import Loading from './components/common/Loading';

import CartButton from './components/CartButton';
import HomeButton from './components/HomeButton';
import ProductsContainer from './components/ProductsContainer';
import FilterContainer from './components/FilterContainer';
import ProductsContent from './components/ProductsContent';
import ProductItem from './components/ProductItem';

import useFetchProducts from './hooks/useFetchProducts';

import { CartItemsContext } from './context/CartItemProvider';

import { CATEGORIES, PRICE_SORT } from './constants/filter';
import { Category, Order } from './types/product';

function App() {
  const { cartItems } = useContext(CartItemsContext);
  const { error, category, filterByCategory, loading, products, sort, setSorting, observerRef } =
    useFetchProducts();

  const selectedCategoryOption = CATEGORIES.find(({ value }) => value === category)!.label;
  const selectedSortOption = PRICE_SORT.find(({ value }) => value === sort.price)!.label;

  const handleCategoryChange = (option: Category) => {
    filterByCategory(option);
  };

  const handlePriceSortChange = (option: Order) => {
    setSorting('price', option);
  };

  return (
    <Container>
      <Header>
        <HomeButton onClick={() => {}} />
        <CartButton count={cartItems.length} onClick={() => {}} />
      </Header>
      <Main>
        <ProductsContainer>
          <Title />
          <FilterContainer>
            <Dropdown
              options={CATEGORIES}
              selectedOption={selectedCategoryOption}
              optionChange={handleCategoryChange}
            />
            <Dropdown
              options={PRICE_SORT}
              selectedOption={selectedSortOption}
              optionChange={handlePriceSortChange}
            />
          </FilterContainer>
          <ProductsContent>
            {products.map((product) => (
              <ProductItem
                key={product.id}
                cartItemId={cartItems.find((cartItem) => product.id === cartItem.product.id)?.id}
                {...product}
              />
            ))}

            {loading && <Loading />}
            <div ref={observerRef} id="observer" style={{ height: '10px' }}></div>
          </ProductsContent>
        </ProductsContainer>
      </Main>
    </Container>
  );
}

export default App;
