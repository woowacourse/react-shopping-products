import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";
import useFetchCartProducts from "./hooks/useFetchCartProducts";

function App() {
  const { isError, setErrorTrue, errorMessage } = useError();
  const { cartItemIds, setCartItemIds, fetchCartProducts } =
    useFetchCartProducts({ setErrorTrue });

  return (
    <div className="container">
      <Header cartItemAmount={cartItemIds.length} />
      <ProductContainer
        cartItemIds={cartItemIds}
        setCartItemIds={setCartItemIds}
        setErrorTrue={setErrorTrue}
        syncCartWithServer={fetchCartProducts}
      />
      {isError && <ErrorToast errorMessage={errorMessage} />}
    </div>
  );
}

export default App;
