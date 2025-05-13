import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";

function App() {
  return (
    <div className="container">
      <Header />
      <ProductContainer />
    </div>
  );
}

export default App;
