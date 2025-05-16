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

export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
};

export type CartItem = {
  id: number;
  quantity: number;
  product: Product;
};

export type Category = "식료품" | "패션잡화" | "전체";
export type PriceOrder = "낮은 가격순" | "높은 가격순";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>("전체");
  const [priceOrder, setPriceOrder] = useState<PriceOrder>("낮은 가격순");
  const [cart, setCart] = useState<CartItem[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const addToCart = async (product: Product) => {
    if (cart.length > 50) {
      setErrorMessage("장바구니에 담을 수 있는 상품은 최대 50개입니다.");
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
    setIsLoading(true);
    setSelectedCategory(category);
    const { data, newErrorMessage } = await getProducts({
      category: category,
      priceOrder: priceOrder,
    });
    setErrorMessage(newErrorMessage);

    setIsLoading(false);
    setProducts(data.content.slice(0, 20));
  };

  const handlePriceOrderChange = async (priceOrder: PriceOrder) => {
    setIsLoading(true);
    setPriceOrder(priceOrder);
    const { data, newErrorMessage } = await getProducts({
      category: selectedCategory,
      priceOrder: priceOrder,
    });
    setErrorMessage(newErrorMessage);
    setIsLoading(false);
    setProducts(data.content.slice(0, 20));
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
      const { data, newErrorMessage: getProductErrorMessage } =
        await getProducts();
      setErrorMessage(getProductErrorMessage);
      if (!getProductErrorMessage) {
        await syncCart();

        setIsLoading(false);
        setProducts(data.content.slice(0, 20));
      }
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
