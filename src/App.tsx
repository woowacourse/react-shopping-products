// import { useState } from "react";
import { css } from "@emotion/css";
import Header from "./components/Header";
import ProductListPage from "./pages/ProductListPage";
import ProductsProvider from "./contexts/ProductsContext";

function App() {
  return (
    <ProductsProvider>
      <div className={AppStyles}>
        <Header />

        {/* ProducListToolBar & ProductCardList를 묶는 ProductListPage를 만들어서, margin-top을 부여하고,
      Header와 ErrorToast를 fixed로 설정하는 것은? */}
        {/* <ProductListToolBar /> */}
        {/* <ProductCard product={product} /> */}
        {/* <ProductCardList products={products} /> */}
        <ProductListPage />
      </div>
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
