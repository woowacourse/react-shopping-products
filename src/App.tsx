import { useEffect, useState } from "react";
import { Products } from "./types";
import ProductItem from "./components/ProductItem/ProductItem";

function App() {
  const [products, setProducts] = useState<Products | null>(null);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}products`
      );
      const data = await response.json();
      setProducts(data);
    })();
  }, []);

  return (
    <>
      <ProductItem />
    </>
  );
}

export default App;
