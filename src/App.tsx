import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import useFetchCartProducts from "./hooks/useFetchCartProducts/useFetchCartProducts";

function App() {
  const { cartItemIds, setCartItemIds, fetchCartProducts } =
    useFetchCartProducts();

  return (
    <div className="container">
      <Header cartItemAmount={cartItemIds.length} />
      <ProductContainer
        cartItemIds={cartItemIds}
        setCartItemIds={setCartItemIds}
        fetchCartProducts={fetchCartProducts}
      />
    </div>
  );
}

export default App;
