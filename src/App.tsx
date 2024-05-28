import { useState } from "react";
import ProductList from "./component/ProductList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ProductList />
    </>
  );
}

export default App;
