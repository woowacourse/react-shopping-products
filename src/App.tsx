import { Container } from './layouts/GlobalLayout/style';

import { createContext, useState } from 'react';

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
import ToastPopup from './components/ToastPopup';

import useFetchProducts from './hooks/useFetchProducts';

import { CATEGORIES, PRICE_SORT } from './constants/filter';
import { CartItem } from './types/cart';
import { Category, Order } from './types/product';

interface CartItemContextProps {
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const InitialState: CartItemContextProps = {
  cartItems: [],
  setCartItems: () => {},
};

export const CartItemContext = createContext(InitialState);

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
    <CartItemContext.Provider value={{ cartItems, setCartItems }}>
      <Container>
        <Header>
          <HomeButton onClick={() => {}} />
          <CartButton count={cartItems.length} onClick={() => {}} />
        </Header>
        <ToastPopup
          isOpen={Boolean(error)}
          message="오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
        />
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
                <ProductItem key={product.id} {...product} />
              ))}
              {loading && <Loading />}
              <div ref={observerRef} id="observer" style={{ height: '10px' }}></div>
            </ProductsContent>
          </ProductsContainer>
        </Main>
      </Container>
    </CartItemContext.Provider>
  );
}

export default App;
