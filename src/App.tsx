import styled from '@emotion/styled';
import { Container } from './layouts/GlobalLayout/style';

import { useRef, useState } from 'react';

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

import useProducts from './hooks/useProducts';
import useIntersectionObserver from './hooks/useIntersectionObserver';

import { CATEGORIES, PRICE_SORT } from './constants/filter';
import { Category, Order } from './types/product';
import CartItemModal from './components/CartItemModal';
import useCartItems from './hooks/useCartItems';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const { data: cartItems } = useCartItems();

  const {
    products,
    category,
    sort,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    error,
    fetchNextPage,
    filterByCategory,
    setSorting,
  } = useProducts();

  const selectedCategoryOption = CATEGORIES.find(({ value }) => value === category)!.label;
  const selectedSortOption = PRICE_SORT.find(({ value }) => value === sort.price)!.label;

  const handleCategoryChange = (option: Category) => {
    filterByCategory(option);
  };

  const handlePriceSortChange = (option: Order) => {
    setSorting('price', option);
  };

  useIntersectionObserver({ isLoading, isFetchingNextPage, error }, observerRef, fetchNextPage, {
    threshold: 0.8,
  });

  return (
    <Container>
      <Header>
        <HomeButton onClick={() => {}} />
        <CartButton
          count={cartItems === undefined ? 0 : cartItems.length}
          onOpen={() => setIsOpen(true)}
        />
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
          <ProductsContentContainer>
            <ProductsContent>
              {products?.map((product) => (
                <ProductItem
                  key={product.id}
                  cartItem={cartItems?.find((cartItem) => product.id === cartItem.product.id)}
                  {...product}
                />
              ))}
              <LastList>
                {isFetchingNextPage ? (
                  <Loading />
                ) : hasNextPage ? (
                  <div ref={observerRef} id="observer" style={{ height: '10px' }}></div>
                ) : (
                  !isLoading && '목록을 모두 조회했습니다.'
                )}
              </LastList>
            </ProductsContent>
          </ProductsContentContainer>
        </ProductsContainer>
      </Main>
      <CartItemModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Container>
  );
}

export default App;

const ProductsContentContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow-y: scroll;
`;

const LastList = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 2;
  border-top: 1px solid ${(props) => props.theme.color.borderGray};
  padding-top: 0.5rem;
`;
