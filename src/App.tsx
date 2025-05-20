import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import SelectDropdownContainer from "./components/SelectDropdown/SelectDropdownContainer";
import { getProducts, ProductResponse } from "./api/products";
import { getCartItems } from "./api/cartItems";
import { CategoryKey, SortKey } from "./constants/selectOption";
import { MAX_BASKET_COUNT } from "./constants/basket";
import { Container } from "./styles/common";
import { ProductCardContainer } from "./styles/ProductCard";
import "./styles/reset.css";
import { ERROR_MSG } from "./constants/errorMessage";
import ErrorMessage from "./components/ErrorMessage";

type BasketProductInfo = {
  productId: number;
  basketId: number;
};

type BasketProductInfos = BasketProductInfo[];

const categoryQueryMap: Record<CategoryKey, string | undefined> = {
  ALL: undefined,
  GROCERY: "식료품",
  FASHION: "패션잡화",
};

const sortQueryMap: Record<SortKey, string | undefined> = {
  NONE: undefined,
  PRICE_LOW: "price,asc",
  PRICE_HIGH: "price,desc",
};

function App() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [category, setCategory] = useState<CategoryKey>("ALL");
  const [sort, setSort] = useState<SortKey>("NONE");
  const [basketProductsIds, setBasketProductsIds] = useState<BasketProductInfos>([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");

  const fetchCartItems = async () => {
    try {
      const data = await getCartItems();
      const mapped: BasketProductInfos = data.map((item) => ({
        productId: item.product.id,
        basketId: item.id,
      }));
      setBasketProductsIds(mapped);
    } catch (error) {
      setError(true);
      setErrorMessage(ERROR_MSG.BASKET_FETCH_FAIL);
      console.error(ERROR_MSG.BASKET_FETCH_FAIL, error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const matchedCategory = categoryQueryMap[category];
        const matchedSort = sortQueryMap[sort];

        const data = await getProducts({
          page: 0,
          size: 20,
          ...(matchedSort && { sort: matchedSort }),
          ...(matchedCategory && { category: matchedCategory }),
        });
        setProducts(data.content);
      } catch (error) {
        setError(true);
        setErrorMessage(ERROR_MSG.PRODUCT_FETCH_FAIL);
        console.error(ERROR_MSG.PRODUCT_FETCH_FAIL, error);
      }
    };
    fetchProducts();
  }, [category, sort]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Container>
      <Header basketCount={basketProductsIds.length} />
      {error && <ErrorMessage message={errorMessage}/>}
      <SelectDropdownContainer
        category={category}
        sort={sort}
        setCategory={setCategory}
        setSort={setSort}
      />
      <ProductCardContainer>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            price={product.price}
            imageUrl={product.imageUrl}
            isInBascket={basketProductsIds.some(
              (item) => item.productId === product.id,
            )}
            basketId={
              basketProductsIds.find((item) => item.productId === product.id)
                ?.basketId
            }
            isNotBasketCountMAX={basketProductsIds.length < MAX_BASKET_COUNT}
            setError={setError}
            fetchCartItems={fetchCartItems}
            setErrorMessage={setErrorMessage}
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default App;
