import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard";
import SelectDropdownContainer from "./components/SelectDropdown/SelectDropdownContainer";
import { getProducts, ProductResponse } from "./api/products";
import { CategoryKey, SortKey } from "./constants/selectOption";
import { MAX_BASKET_COUNT } from "./constants/basket";
import { Container } from "./styles/common";
import { ProductCardContainer } from "./components/ProductCard/ProductCard.styled";
import "./styles/reset.css";
import { ERROR_MSG } from "./constants/errorMessage";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import DotWaveSpinner from "./components/DotWaveSpinner/DotWaveSpinner";
import { useCartContext } from "./contexts/CartContext";
import { useUIContext } from "./contexts/UIContext";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { basketProductsIds, fetchCartItems } = useCartContext();
  const { error, setError, errorMessage, setErrorMessage } = useUIContext();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, [category, sort]);

  useEffect(() => {
    fetchCartItems(true);
  }, []);

  return (
    <Container>
      <Header basketCount={basketProductsIds.length} />
      {error && <ErrorMessage message={errorMessage} />}
      {isLoading && <DotWaveSpinner />}
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
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default App;
