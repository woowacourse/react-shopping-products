import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ErrorToast from "./components/errorToast/ErrorToast";

function App() {
  return (
    <div className="container">
      <Header />
      <ProductContainer />
      <ErrorToast />
    </div>
  );
}

export default App;
