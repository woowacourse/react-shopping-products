import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import ProductListContainer from "./components/ProductListContainer/ProductListContainer";
import Spinner from "./components/common/Spinner/Spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import fetchAddProduct from "./apis/product/fetchAddProduct";
import fetchRemoveProduct from "./apis/product/fetchRemoveProduct";
import fetchCartItems from "./apis/product/fetchCartItems";

import styled from "@emotion/styled";
import useErrorMessage from "./hooks/useErrorMessage";

function App() {
  const [selectedProductIdList, setSelectedProductIdList] = useState<string[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const { errorMessage, handleErrorMessage } = useErrorMessage();

  useEffect(() => {
    (async () => {
      try {
        const { content } = await fetchCartItems({
          params: {
            page: "0",
            size: "50",
          },
        });

        setSelectedProductIdList(
          content.map((item) => item.product.id.toString())
        );
        setLoading(false);
      } catch (error) {
        if (!(error instanceof Error)) {
          return;
        }

        handleErrorMessage(error.message);
      }
    })();
  }, [handleErrorMessage]);

  const handleAddProduct = async (productId: string) => {
    if (selectedProductIdList.length === 50) {
      handleErrorMessage("장바구니에 최대 추가 가능한 개수는 50개 입니다.");
      return;
    }

    setSelectedProductIdList((prevIdList) => {
      const newIdListSet = new Set([...prevIdList, productId]);
      return Array.from(newIdListSet);
    });

    try {
      await fetchAddProduct({
        params: {
          productId: productId,
          quantity: "1",
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }
      handleErrorMessage(error.message);
    }
  };

  const handleRemoveProduct = async (productId: string) => {
    setSelectedProductIdList((prevIdList) => {
      return prevIdList.filter((prevId) => prevId !== productId);
    });

    try {
      const { content } = await fetchCartItems({
        params: {
          page: "0",
          size: "50",
        },
      });

      const targetCartItem = content.find(
        (cartItem) => cartItem.product.id.toString() === productId
      );

      if (!targetCartItem) {
        return;
      }

      await fetchRemoveProduct({
        params: {
          productId: targetCartItem.id,
        },
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        return;
      }

      handleErrorMessage(error.message);
    }
  };

  if (loading) {
    return (
      <Container>
        <Wrapper>
          <Spinner />
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container>
      <Wrapper>
        <Header selectedProductIdList={selectedProductIdList}></Header>
        {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
        <ProductListContainer
          selectedProductIdList={selectedProductIdList}
          handleAddProduct={handleAddProduct}
          handleRemoveProduct={handleRemoveProduct}
        />
      </Wrapper>
    </Container>
  );
}

export default App;

const Container = styled.main`
  display: flex;
  max-width: 430px;
  min-height: 100vh;
  margin: 0 auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
