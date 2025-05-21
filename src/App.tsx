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
import AddProductItemApi from "./api/AddProductItemApi";
import { CART_MAX_COUNT } from "./constants/constants";
import RemoveProductItemApi from "./api/RemoveProductItemApi";

function App() {
  const [productList, setProductList] = useState<ResponseProduct[]>([]);
  const [productListLoading, setProductListLoading] = useState(true);
  const [productListErrorMessage, setProductListErrorMessage] = useState("");

  const [cartItemList, setCartItemList] = useState<ResponseCartItem[]>([]);
  const [cartItemListLoading, setCartItemListLoading] = useState(true);
  const [cartItemListErrorMessage, setCartItemListErrorMessage] = useState("");

  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  const [quantity, setQuantity] = useState(0);

  const handleProductErrorMessage = (message: string) => {
    setProductListErrorMessage("");
    setTimeout(() => {
      setProductListErrorMessage(message);
    }, 10);
  };

  const handleCartErrorMessage = (message: string) => {
    setCartItemListErrorMessage("");
    setTimeout(() => {
      setCartItemListErrorMessage(message);
    }, 10);
  };
  //TODO : 이후 커스텀 훅으로 분리하자!
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        const rawProductList = await getProductList({
          category: category,
          sort: sort,
        });
        setProductList(rawProductList);
      } catch (error) {
        if (error instanceof Error) {
          handleProductErrorMessage(error.message);
        }
      } finally {
        setProductListLoading(false);
      }
    };
    fetchProductList();
  }, [category, sort]);

  useEffect(() => {
    const fetchCartItemList = async () => {
      try {
        const rawCartItemList = await getCartItemList({});
        setCartItemList(rawCartItemList);
      } catch (error) {
        if (error instanceof Error) {
          handleCartErrorMessage(error.message);
        }
      } finally {
        setCartItemListLoading(false);
      }
    };
    fetchCartItemList();
  }, []);

  const isLoading = productListLoading || cartItemListLoading;

  async function handleAddToCard(productId: number) {
    try {
      if (cartItemList.length >= CART_MAX_COUNT) {
        handleCartErrorMessage(
          `장바구니에는 최대 ${CART_MAX_COUNT}개의 상품만 담을 수 있습니다.`
        );
        return;
      }

      await AddProductItemApi(productId, 1);

      const rawCartItemList = await getCartItemList({});
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    }
  }

  const handleRemoveFromCart = async (cartItemId: number) => {
    try {
      await RemoveProductItemApi(cartItemId);

      const rawCartItemList = await getCartItemList({});
      setCartItemList(rawCartItemList);
    } catch (error) {
      if (error instanceof Error) {
        handleCartErrorMessage(error.message);
      }
    }
  };
  return (
    <S.AppContainer>
      <S.Wrap>
        {isLoading ? (
          <LoadingIcon />
        ) : (
          <>
            <Header cartItemList={cartItemList} />
            <S.MiddleContainer>
              <ProductControl setCategory={setCategory} setSort={setSort} />
              <ProductList
                productList={productList}
                cartItemList={cartItemList}
                onAddToCart={handleAddToCard}
                onRemoveFromCart={handleRemoveFromCart}
                setErrorMessage={handleProductErrorMessage}
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </S.MiddleContainer>
          </>
        )}
        <ErrorBox text={productListErrorMessage} backgroundColor="#FFC9C9" />
        <ErrorBox text={cartItemListErrorMessage} backgroundColor="#FFC9C9" />
      </S.Wrap>
    </S.AppContainer>
  );
}

export default App;
