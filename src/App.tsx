import { useState } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import fetchAddProduct from "./apis/product/fetchAddProduct";

import styled from "@emotion/styled";

function App() {
  const [selectedProductIdList, setSelectedProductIdList] = useState<string[]>(
    []
  );

  const handleAddProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    const $product = event.currentTarget.closest("li");
    if (!$product) {
      return;
    }

    setSelectedProductIdList((prevIdList) => [...prevIdList, $product.id]);

    fetchAddProduct({
      method: "POST",
      params: {
        productId: $product.id,
        quantity: "1",
      },
    });
  };

  const handleRemoveProduct = (event: React.MouseEvent<HTMLButtonElement>) => {
    const $product = event.currentTarget.closest("li");
    if (!$product) {
      return;
    }

    setSelectedProductIdList((prevIdList) =>
      prevIdList.filter((productId) => productId !== $product.id)
    );
  };

  return (
    <Container>
      <Header></Header>
      <Main
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      ></Main>
    </Container>
  );
}

export default App;

const Container = styled.main`
  max-width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
