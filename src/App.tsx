// import { useState } from "react";
import { css } from "@emotion/css";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ShoppingCartProvider from "./contexts/shoppingCart/ShoppingCartProvider";
import ProductsProvider from "./contexts/products/ProductsProvider";

function App() {
  return (
    <ProductsProvider>
      <ShoppingCartProvider>
        <div className={AppStyles}>
          <Header />
          <ProductListPage />
        </div>
      </ShoppingCartProvider>
    </ProductsProvider>
  );
}

export default App;

const AppStyles = css`
  display: flex;
  min-height: 100dvh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #ffffff;
`;
