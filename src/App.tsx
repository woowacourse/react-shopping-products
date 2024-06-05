import { useState } from "react";
import { AppLayout, ProductListLayout } from "@/layout";
import {
  Cart,
  Filter,
  Header,
  ProductList,
  ProductListTitle,
} from "@/components";

function App() {
  return (
    <AppLayout>
      <Header />
      <ProductListLayout>
        <Filter />
        <ProductListTitle />
        <ProductList />
      </ProductListLayout>
    </AppLayout>
  );
}

export default App;
