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
            size: "50",
          },
        });

        setSelectedProductIdList(
          content.map((item) => item.product.id.toString())
        );
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

  const handleRemoveProduct = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const $product = event.currentTarget.closest("li");
    if (!$product) {
      return;
    }

    setSelectedProductIdList((prevIdList) => {
      return prevIdList.filter((productId) => productId !== $product.id);
    });

    try {
      const { content } = await fetchCartItems({
        method: "GET",
        params: {
          page: "0",
          size: "50",
        },
      });

      const targetCartItem = content.find(
        (cartItem) => cartItem.product.id.toString() === $product.id
      );

      if (!targetCartItem) {
        return;
      }

      await fetchRemoveProduct({
        method: "DELETE",
        params: {
          productId: targetCartItem.id,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Header selectedProductIdList={selectedProductIdList}></Header>
      <Main
        selectedProductIdList={selectedProductIdList}
        handleAddProduct={handleAddProduct}
        handleRemoveProduct={handleRemoveProduct}
      />
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
