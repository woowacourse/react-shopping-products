import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Spinner from "./components/common/Spinner/Spinner";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

import fetchAddProduct from "./apis/product/fetchAddProduct";
import fetchRemoveProduct from "./apis/product/fetchRemoveProduct";
import fetchCartItems from "./apis/product/fetchCartItems";

import styled from "@emotion/styled";

function App() {
  const [selectedProductIdList, setSelectedProductIdList] = useState<string[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (errorMessage) {
      timer = setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [errorMessage]);

  //TODO: 장바구니 목록 가져올 때 로딩중
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
        setLoading(false);
      } catch (error) {
        if (error instanceof Error === false) {
          return;
        }

        setErrorMessage(error.message);
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

    if (selectedProductIdList.length === 50) {
      // TODO: 에러 메시지 보여주기?
      return;
    }

    setSelectedProductIdList((prevIdList) => {
      const newIdListSet = new Set([...prevIdList, $product.id]);
      return Array.from(newIdListSet);
    });

    try {
      await fetchAddProduct({
        method: "POST",
        params: {
          productId: $product.id,
          quantity: "1",
        },
      });
    } catch (error) {
      if (error instanceof Error === false) {
        return;
      }
      setErrorMessage(error.message);
    }
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

      // try catch
      await fetchRemoveProduct({
        method: "DELETE",
        params: {
          productId: targetCartItem.id,
        },
      });
    } catch (error) {
      if (error instanceof Error === false) {
        return;
      }

      setErrorMessage(error.message);
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
        <Main
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
  margin: auto;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
