import "./index.css";
import "./reset.css";
import Header from "./components/header/Header";
import ProductContainer from "./components/productContainer/ProductContainer";
import ProductCard from "./components/productCard/ProductCard";

function App() {
  return (
    <div className="container">
      <Header />
      <ProductContainer />
      <ProductCard />
    </div>
  );
}

export default App;
