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
import useFetchProducts from './hooks/useFetchProducts';
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
    filterByCategory,
    loading,
    products,
    sort,
    filterBySort,
    fetchNextPage,
  } = useFetchProducts();

  const selectedCategoryOption = Object.entries(CATEGORY).find(
    ([, value]) => value === category,
  )![0];

  const selectedSortOption = Object.entries(PRICE_SORT).find(
    ([, value]) => value === sort.price,
  )![0];

  const handleCategoryChange = (option: string) => {
    filterByCategory(CATEGORY[option]);
  };

  const handlePriceSortChange = (option: string) => {
    filterBySort('price', PRICE_SORT[option]);
  };

  useIntersectionObserver(loading, observerRef, fetchNextPage, { threshold: 0.8 });

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
                optionArray={Object.keys(CATEGORY)}
                selectedOption={selectedCategoryOption}
                optionChange={handleCategoryChange}
              />
              <Dropdown
                optionArray={Object.keys(PRICE_SORT)}
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
