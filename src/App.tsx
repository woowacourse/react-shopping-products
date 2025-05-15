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
import { ErrorBoundary } from "react-error-boundary";

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    try {
      (async () => {
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
      })();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
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
              <ProductControl setProductList={setProductList} />
              <ProductList
                productList={productList}
                cartItemList={cartItemList}
              />
            </S.MiddleContainer>
          </>
        )}
      </S.Wrap>
    </S.Global>
  );
}

export default App;
