import Product from "./components/Product/Product";

const product = {
  id: 61,
  name: "방울토마토",
  price: 50000,
  imageUrl: "https://jjfoodmarket.co.kr/data/shop/item/1671006183_l1",
  category: "식료품",
} as const;

function App() {
  return <Product product={product}></Product>;
}

export default App;
