import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";
import useError from "./hooks/useError";

function App() {
  const { isError } = useError();

  return (
    <div className="container">
      <Header />
      <ProductContainer />
      {isError && <ErrorToast />}
    </div>
  );
}

export default App;
