import * as S from "./App.styled";
import Header from "./components/Header/Header";
import ProductControl from "./components/ProductControl/ProductControl";
import ProductList from "./components/ProductList/ProductList";
import ErrorBox from "./components/common/ErrorBox/ErrorBox";
import getProductList from "./api/ProductListApi";
import { useEffect, useState } from "react";
import { ResponseCartItem, ResponseProduct } from "./api/types";
import getCartItemList from "./api/CartItemListApi";

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);

  useEffect(() => {
    (async () => {
      const rawCartItemList = await getCartItemList();
      const rawProductList = await getProductList({ category: "", sort: "" });
      setCartItemList(rawCartItemList);
      setProductList(rawProductList);
      //FIX: 리팩토링 필요
      const newProductList = rawProductList.map((product) => {
        const isInCart = rawCartItemList.some(
          (cartItem) => cartItem.product.id === product.id
        );
        return isInCart ? { ...product, isInCart: true } : product;
      });
      setProductList(newProductList);
    })();
  }, []);

  return (
    <S.Global>
      <S.Wrap>
        <Header cartItemList={cartItemList} />
        <ErrorBox backgroundColor="#FFC9C9" text="에러 발생" />
        <S.MiddleContainer>
          <ProductControl setProductList={setProductList} />
          <ProductList productList={productList} cartItemList={cartItemList} />
        </S.MiddleContainer>
      </S.Wrap>
    </S.Global>
  );
}

export default App;
