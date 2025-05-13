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

  return (
    <>
      <h1>React Shopping Products</h1>
      {products.map((product) => (
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
