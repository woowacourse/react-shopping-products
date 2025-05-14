import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";

import fetchAddProduct from "./apis/product/fetchAddProduct";
import fetchRemoveProduct from "./apis/product/fetchRemoveProduct";
import fetchCartItems from "./apis/product/fetchCartItems";

import styled from "@emotion/styled";

function App() {
  const [selectedProductIdList, setSelectedProductIdList] = useState<string[]>(
    []
  );

  useEffect(() => {
    (async () => {
      try {
        const { content } = await fetchCartItems({
          method: "GET",
          params: {
            page: "0",
            size: "20",
          },
        });
        setSelectedProductIdList(content);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleAddProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    if (!$product) {
      return;
    }

    setSelectedProductIdList((prevIdList) => {
      const newIdListSet = new Set([...prevIdList, $product.id]);
      return Array.from(newIdListSet);
    });

    await fetchAddProduct({
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
      <Header selectedProductIdList={selectedProductIdList}></Header>
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
