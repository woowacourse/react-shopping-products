import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";
import getProductList from "./api/ProductListApi";
import getCartItemList from "./api/CartItemListApi";
import LoadingIcon from "./components/Icon/LoadingIcon";
import { useEffect, useState } from "react";
import { ResponseCartItem, ResponseProduct } from "./api/types";

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSetErrorMessage = (message: string) => {
    setErrorMessage("");

    setTimeout(() => {
      setErrorMessage(message);
    }, 10);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rawCartItemList = await getCartItemList();
        const rawProductList = await getProductList({ category: "", sort: "" });
        setCartItemList(rawCartItemList);
        setProductList(rawProductList);
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
    <S.AppContainer>
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
                setCartItemList={setCartItemList}
                setErrorMessage={handleSetErrorMessage}
              />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={errorMessage} backgroundColor="#FFC9C9" />
      </S.Wrap>
    </S.AppContainer>
  );
}

export default App;
