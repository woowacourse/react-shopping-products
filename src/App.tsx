import { useEffect, useState } from 'react';
import getProducts from './api/getProducts';
import deleteCartItems from './api/deleteCartItems';
import ProductItem from './components/ProductItem/ProductItem';
import isInCart from './utils/isIncart';
import Header from './components/header/Header';
import getCartItems from './api/getCartItems';
import postCartItems from './api/postCartItems';
import './reset.css';
import styled from '@emotion/styled';
import './app.css';

// {
//     "id": 61,
//     "name": "방울토마토",
//     "price": 50000,
//     "imageUrl": "https://jjfoodmarket.co.kr/data/shop/item/1671006183_l1",
//     "category": "식료품"
// }

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

type Category = '식료품' | '패션잡화' | '전체';
type SortPrice = '낮은 가격순' | '높은 가격순';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [sortPrice, setSortPrice] = useState<SortPrice>('낮은 가격순');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = async (product: Product) => {
    await postCartItems(product);
    const cartData = await getCartItems();
    const cartItems = cartData.content;
    setCart(cartItems);
  };

  const removeFromCart = async (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }

    const cartItemId = cartItem.id;
    await deleteCartItems(cartItemId);

    const cartData = await getCartItems();
    const cartItems = cartData.content;
    setCart(cartItems);
  };

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === '전체') {
      return true;
    }
    return product.category === selectedCategory;
  });

  const sortedProducts = filteredProducts.sort((a: Product, b: Product) => {
    if (sortPrice === '높은 가격순') {
      return b.price - a.price;
    }

    return a.price - b.price;
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      const cartData = await getCartItems();

      setProducts(data.content.slice(0, 20));
      setCart(cartData.content);
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Header cartItemCount={cart.length} />
      <ProductPageContainer>
        <ProductPageHeader>bppl 상품 목록</ProductPageHeader>
        <SelectContainer>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as Category)}
          >
            <option value="전체">전체</option>
            <option value="식료품">식료품</option>
            <option value="패션잡화">패션잡화</option>
          </select>
          <select
            id="sortPrice"
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value as SortPrice)}
          >
            <option value="낮은 가격순">낮은 가격순</option>
            <option value="높은 가격순">높은 가격순</option>
          </select>
        </SelectContainer>
        <ProductListContainer>
          {sortedProducts.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
              isInCart={isInCart(cart, product.id)}
            />
          ))}
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
