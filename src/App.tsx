import ProductCard from "./components/product/ProductCard";
import { Global } from "@emotion/react";
import { reset } from "./style/reset";

function App() {
  const product = {
    id: 0,
    name: "스마트폰",
    price: 699,
    imageUrl: "https://via.placeholder.com/150/0000FF/808080?text=스마트폰",
    category: "Electronics",
    description: "hi",
  };
  return (
    <>
      <Global styles={reset} />
      <ProductCard product={product} />
    </>
  );
}

export default App;
