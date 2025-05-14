import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";
import request from "./utils/request";
import { useEffect, useState } from "react";
import { CartItem } from "./types/response.types";

function App() {
  const { isError, setErrorTrue, errorMessage } = useError();

  const [cartItemIds, setCartItemIds] = useState<number[]>([]);
  async function fetchCartItems() {
    try {
      const data = await request({
        method: "GET",
        url: "/cart-items",
        headers: {
          Authorization: import.meta.env.VITE_TOKEN,
          "Content-Type": "application/json",
        },
      });

      setCartItemIds(data.content.map((data: CartItem) => data.product.id));
    } catch {
      setErrorTrue("CART");
    }
  }

  useEffect(() => {
    (async () => {
      await fetchCartItems();
    })();
  }, []);

  return (
    <div className="container">
      <Header cartItemAmount={cartItemIds.length} />
      <ProductContainer
        cartItemIds={cartItemIds}
        setCartItemIds={setCartItemIds}
      />
      {isError && <ErrorToast errorMessage={errorMessage} />}
    </div>
  );
}

export default App;
