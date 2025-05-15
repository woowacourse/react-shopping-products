// import { useState } from "react";
import { css } from "@emotion/css";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductsProvider from "./contexts/ProductsProvider";
import ShoppingCartProvider from "./contexts/ShoppingCartProvider";

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
