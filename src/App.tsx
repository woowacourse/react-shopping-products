import { useState } from "react";
import Header from "./components/Header/Header";
import Product from "./pages/Product";
import GlobalStyles from "./styles/Global.style";
import { QuantityContext } from "./store/QuantityContext";

function App() {
  const [quantity, setQuantity] = useState(0);
  return (
    <>
      <GlobalStyles />

      <QuantityContext.Provider value={{ quantity, setQuantity }}>
        <Header />
        <Product />
      </QuantityContext.Provider>
    </>
  );
}

export default App;
