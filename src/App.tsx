import { useState } from "react";

import Header from "./components/Header/Header";
import Product from "./pages/Product";
import GlobalStyles from "./styles/Global.style";
import Toast from "./components/common/Toast/Toast";
import { QuantityContext } from "./store/QuantityContext";

function App() {
  const [quantity, setQuantity] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const handleError = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };
  return (
    <>
      <GlobalStyles />
      <Toast message={toastMessage} showToast={showToast} />
      <QuantityContext.Provider value={{ quantity, setQuantity }}>
        <Header />
        <Product onError={handleError} />
      </QuantityContext.Provider>
    </>
  );
}

export default App;
