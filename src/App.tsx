import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";
import getProductList from "./api/ProductListApi";
import { useEffect, useState } from "react";
import { ResponseCartItem, ResponseProduct } from "./api/types";
import getCartItemList from "./api/CartItemListApi";
import LoadingIcon from "./components/Icon/LoadingIcon";

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // 에러 메시지 설정 함수 - 중간에 메시지를 초기화했다가 다시 설정
  const handleSetErrorMessage = (message: string) => {
    setErrorMessage(""); // 먼저 에러 메시지를 초기화

    // setTimeout을 사용하여 다음 렌더 사이클에서 에러 메시지 설정
    setTimeout(() => {
      setErrorMessage(message);
    }, 10);
  };

  useEffect(() => {
    console.log("errorMessage", errorMessage);
  }, [errorMessage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawCartItemList = await getCartItemList();
        const rawProductList = await getProductList({ category: "", sort: "" });
        setCartItemList(rawCartItemList);
        const newProductList = rawProductList.map((product) => {
          const isInCart = rawCartItemList.some(
            (cartItem) => cartItem.product.id === product.id
          );
          return isInCart ? { ...product, isInCart: true } : product;
        });
        setProductList(newProductList);
      } catch (error) {
        if (error instanceof Error) {
          handleSetErrorMessage(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <S.Global>
      <S.Wrap>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <Header cartItemList={cartItemList} />
            <S.MiddleContainer>
              <ProductControl
                setProductList={setProductList}
                setErrorMessage={handleSetErrorMessage}
              />
              <ProductList
                productList={productList}
                cartItemList={cartItemList}
                setErrorMessage={handleSetErrorMessage}
              />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={errorMessage} backgroundColor="#FFC9C9" />
      </S.Wrap>
    </S.Global>
  );
}

export default App;
