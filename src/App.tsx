import { Container } from './layouts/GlobalLayout/style';

import { createContext, useRef, useState } from 'react';

import CartButton from './components/CartButton';
import HomeButton from './components/HomeButton';
import ProductsContainer from './components/ProductsContainer';
import FilterContainer from './components/FilterContainer';
import ProductsContent from './components/ProductsContent';
import ProductItem from './components/ProductItem';
import Header from './components/common/Header';
import Main from './components/common/Main';
import Dropdown from './components/common/Dropdown';
import Title from './components/common/Title';
import useProducts from './hooks/useProducts';
import Loading from './components/common/Loading';
import ToastPopup from './components/ToastPopup';
import useIntersectionObserver from './hooks/useIntersectionObserver';

import { CATEGORY, PRICE_SORT } from './constants/filter';
import { CartItem } from './types/cart';

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
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const {
    error,
    category,
    handleCategoryChange,
    loading,
    products,
    priceOrder,
    handlePriceOrderChange,
    fetchNextPage,
  } = useProducts();

  const selectedCategoryOption = Object.entries(CATEGORY).find(
    ([, value]) => value === category,
  )![0];

  const selectedPriceOrderOption = Object.entries(PRICE_SORT).find(
    ([, value]) => value === priceOrder,
  )![0];

  useIntersectionObserver(loading, observerRef, fetchNextPage, { threshold: 0.8 });

  return (
    <CartItemContext.Provider value={{ cartItems, setCartItems }}>
      <Container>
        <Header>
          <HomeButton onClick={() => {}} />
          <CartButton count={cartItems.length} onClick={() => {}} />
        </Header>
        <ToastPopup error={error as Error} />
        <Main>
          <ProductsContainer>
            <Title />
            <FilterContainer>
              <Dropdown
                optionArray={Object.keys(CATEGORY)}
                selectedOption={selectedCategoryOption}
                optionChange={(option) => handleCategoryChange(CATEGORY[option])}
              />
              <Dropdown
                optionArray={Object.keys(PRICE_SORT)}
                selectedOption={selectedPriceOrderOption}
                optionChange={(option) => handlePriceOrderChange(PRICE_SORT[option])}
              />
            </FilterContainer>
            <ProductsContent>
              {products.map((product) => (
                <ProductItem key={product.id} {...product} />
              ))}
              <div ref={observerRef} id="observer" style={{ height: '10px' }} />
            </ProductsContent>
            <Loading isLoading={loading} />
          </ProductsContainer>
        </Main>
      </Container>
    </CartItemContext.Provider>
  );
}

export default App;
