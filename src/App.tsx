import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";
import request from "./utils/request";
import { useEffect, useState } from "react";
import { Product } from "./types/response.types";

function App() {
  const { isError } = useError();

  const [cartItemIds, setCartItemIds] = useState([]);
  async function fetchCartItems() {
    const data = await request({
      method: "GET",
      url: "/cart-items",
      headers: {
        Authorization: import.meta.env.VITE_TOKEN,
        "Content-Type": "application/json",
      },
    });
    setCartItemIds(data.content.map((data: Product) => data.id));
  }

  useEffect(() => {
    (async () => {
      await fetchCartItems();
    })();
  }, []);

  return (
    <div className="container">
      <Header cartItemAmount={cartItemIds.length} />
      <ProductContainer />
      {isError && <ErrorToast />}
    </div>
  );
}

export default App;
