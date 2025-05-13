import { useEffect, useState } from 'react';
import getProducts from './getProducts';
// {
//     "id": 61,
//     "name": "방울토마토",
//     "price": 50000,
//     "imageUrl": "https://jjfoodmarket.co.kr/data/shop/item/1671006183_l1",
//     "category": "식료품"
// }

type Product = {
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
  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();

      console.log(data.content);
      setProducts(data.content.slice(0, 20));
    };

    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [sortPrice, setSortPrice] = useState<SortPrice>('낮은 가격순');

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === '전체') {
      return true;
    }
    return product.category === selectedCategory;
  });

  const sortedProducts = filteredProducts.sort((a: Product, b:Product
  ) => {
    if (sortPrice === '높은 가격순') {
      return b.price - a.price;
    }

    return a.price-b.price
  });

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
        <div key={product.id}>
          <img
            src={product.imageUrl}
            alt={product.name}
            width="182px"
            height="112px"
          />
          <p>{product.name}</p>
          <p>{product.price.toLocaleString()}원</p>
        </div>
      ))}
    </>
  );
}

export default App;
