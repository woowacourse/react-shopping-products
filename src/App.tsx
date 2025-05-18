import { useEffect, useState } from "react";
import getProducts from "./api/getProducts";
import deleteCartItems from "./api/deleteCartItems";
import Header from "./components/header/Header";
import getCartItems from "./api/getCartItems";
import postCartItems from "./api/postCartItems";
import "./reset.css";
import styled from "@emotion/styled";
import "./app.css";
import ProductItemsWithSkeleton from "./components/ProductItemsWithSkeleton";
import ErrorMessage from "./components/ErrorMessage";
import Select from "./components/Select";
import { Product, CartItem, Category, PriceOrder } from "./types/productType";
import useLoading from "./hooks/useLoading";

export const PRODUCT_TYPE_COUNT = 20;
export const CART_MAX_COUNT = 50;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("낮은 가격순");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { isLoading, withLoading } = useLoading();

  const addToCart = async (product: Product) => {
    if (cart.length > CART_MAX_COUNT) {
      setErrorMessage(
        `장바구니에 담을 수 있는 상품은 최대 ${CART_MAX_COUNT}개입니다.`
      );
      return;
    }
    const { newErrorMessage: postErrorMessage } = await postCartItems(product);
    setErrorMessage(postErrorMessage);

    if (!postErrorMessage) {
      await syncCart();
    }
  };

  const removeFromCart = async (productId: number) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    if (!cartItem) {
      return;
    }

    const cartItemId = cartItem.id;
    const { newErrorMessage: deleteErrorMessage } = await deleteCartItems(
      cartItemId
    );
    setErrorMessage(deleteErrorMessage);

    if (!deleteErrorMessage) {
      await syncCart();
    }
  };

  const handleCategoryChange = async (category: Category) => {
    await withLoading(async () => {
      setSelectedCategory(category);
      const { data, newErrorMessage } = await getProducts({
        category,
        priceOrder,
      });
      setErrorMessage(newErrorMessage);
      setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
    });
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    await withLoading(async () => {
      setPriceOrder(priceOrder);
      const { data, newErrorMessage } = await getProducts({
        category: selectedCategory,
        priceOrder: priceOrder,
      });
      setErrorMessage(newErrorMessage);
      setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
    });
  };

  const syncCart = async () => {
    const { data: cartData, newErrorMessage: getErrorMessage } =
      await getCartItems();
    setErrorMessage(getErrorMessage);
    const cartItems = cartData.content;
    setCart(cartItems);
  };

  useEffect(() => {
    const fetchData = async () => {
      await withLoading(async () => {
        const { data, newErrorMessage: getProductErrorMessage } =
          await getProducts();
        setErrorMessage(getProductErrorMessage);
        if (!getProductErrorMessage) {
          await syncCart();
          setProducts(data.content.slice(0, PRODUCT_TYPE_COUNT));
        }
      });
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Header cartItemCount={cart.length} />
      {errorMessage && <ErrorMessage errorMessage={errorMessage} />}
      <ProductPageContainer>
        <ProductPageHeader>bppl 상품 목록</ProductPageHeader>
        <SelectContainer>
          <Select
            optionList={["전체", "식료품", "패션잡화"]}
            value={selectedCategory}
            setValue={handleCategoryChange}
            id="category-select"
          />
          <Select
            optionList={["낮은 가격순", "높은 가격순"]}
            value={priceOrder}
            setValue={handlePriceOrderChange}
            id="price-order-select"
          />
        </SelectContainer>
        <ProductListContainer>
          <ProductItemsWithSkeleton
            isLoading={isLoading}
            products={products}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
            cart={cart}
          />
        </ProductListContainer>
      </ProductPageContainer>
    </Layout>
  );
}

const Layout = styled.div`
  width: 500px;
  height: 100vh;
  background-color: white;
  margin: 0 auto;
`;

const ProductPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px 25px;
  height: calc(100vh - 64px - 60px);};

`;

const ProductPageHeader = styled.div`
  font-size: 28px;
  font-weight: 700;
`;

const SelectContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const ProductListContainer = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  overflow-x: hidden;
  overflow-y: auto;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default App;
