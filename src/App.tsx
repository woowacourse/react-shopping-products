import { useEffect, useState } from 'react';
import getProducts from './api/getProducts';
import deleteCartItems from './api/deleteCartItems';
import Header from './components/header/Header';
import getCartItems from './api/getCartItems';
import postCartItems from './api/postCartItems';
import './reset.css';
import styled from '@emotion/styled';
import './app.css';
import ProductItemsWithSkeleton from './components/ProductItemsWithSkeleton';
import ErrorMessage from './components/ErrorMessage';

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Category = '식료품' | '패션잡화' | '전체';
type priceOrder = '낮은 가격순' | '높은 가격순';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [priceOrder, setPriceOrder] = useState<priceOrder>('낮은 가격순');
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const addToCart = async (product: Product) => {
    if (cart.length > 50) {
      setErrorMessage('장바구니에 담을 수 있는 상품은 최대 50개입니다.');
      return;
    }
    const { newErrorMessage: postErrorMessage } = await postCartItems(product);
    setErrorMessage(postErrorMessage);
    if (!postErrorMessage) {
      const { data: cartData, newErrorMessage } = await getCartItems();
      setErrorMessage(newErrorMessage);
      const cartItems = cartData.content;
      setCart(cartItems);
    }
  };

  const removeFromCart = async (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }

    const cartItemId = cartItem.id;
    const { data, newErrorMessage: deleteErrorMessage } = await deleteCartItems(
      cartItemId
    );
    setErrorMessage(deleteErrorMessage);

    if (!deleteErrorMessage) {
      const { data: cartData, newErrorMessage: getErrorMessage } =
        await getCartItems();
      setErrorMessage(getErrorMessage);
      const cartItems = cartData.content;
      setCart(cartItems);
    }
  };

  const handleCategoryChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoading(true);
    setSelectedCategory(e.target.value as Category);
    const { data, newErrorMessage } = await getProducts({
      category: e.target.value as Category,
      priceOrder: priceOrder,
    });
    setErrorMessage(newErrorMessage);

    setIsLoading(false);
    setProducts(data.content.slice(0, 20));
  };

  const handlePriceOrderChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setIsLoading(true);
    setPriceOrder(e.target.value as priceOrder);
    const { data, newErrorMessage } = await getProducts({
      category: selectedCategory,
      priceOrder: e.target.value as priceOrder,
    });
    setErrorMessage(newErrorMessage);
    setIsLoading(false);
    setProducts(data.content.slice(0, 20));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data, newErrorMessage } = await getProducts();
      const { data: cartData, errorMessage } = await getCartItems();
      setErrorMessage(errorMessage);
      setIsLoading(false);
      setErrorMessage(newErrorMessage);

      setProducts(data.content.slice(0, 20));
      setCart(cartData.content);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Header cartItemCount={cart.length} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <ProductPageContainer>
        <ProductPageHeader>bppl 상품 목록</ProductPageHeader>
        <SelectContainer>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="전체">전체</option>
            <option value="식료품">식료품</option>
            <option value="패션잡화">패션잡화</option>
          </select>
          <select
            id="priceOrder"
            value={priceOrder}
            onChange={handlePriceOrderChange}
          >
            <option value="낮은 가격순">낮은 가격순</option>
            <option value="높은 가격순">높은 가격순</option>
          </select>
        </SelectContainer>
        <ProductListContainer>
          <ProductItemsWithSkeleton
            isLoading={isLoading}
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        </ProductListContainer>
      </ProductPageContainer>
    </Layout>
  );
}

const Layout = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
`;

const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 25px;
  height: calc(100vh - 64px - 60px);};
`;

const ProductPageHeader = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const ProductListContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
