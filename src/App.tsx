import { useEffect, useState } from 'react';
import getProducts from './getProducts';
import ProductItem from './components/ProductItem/ProductItem';
import isInCart from './components/utils/isIncart';
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

type Category = '식료품' | '패션잡화' | '전체';
type SortPrice = '낮은 가격순' | '높은 가격순';

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [sortPrice, setSortPrice] = useState<SortPrice>('낮은 가격순');
  const [cart, setCart] = useState<Product[]>([]);
  console.log(cart);

  const addToCart = (product: Product) => {
    if (isInCart(cart, product.id)) {
      console.log('이미 장바구니에 담긴 상품입니다.');
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (product: Product) => {
    setCart((prev) => prev.filter((item) => item.id !== product.id));
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

      setProducts(data.content.slice(0, 20));
    };

    fetchData();
  }, []);

  return (
    <>
      <h1>React Shopping Products</h1>
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
      {sortedProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          isInCart={isInCart(cart, product.id)}
        />
      ))}
    </>
  );
}

export default App;
