import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import SelectDropdownContainer from "./components/SelectDropdown/SelectDropdownContainer";
import { getProducts, ProductResponse } from "./api/products";
import { getCartItems } from "./api/cartItems";
import { CATEGORY, SORT } from "./constants/selectOption";
import { MAX_BASKET_COUNT } from "./constants/basket";
import { Container } from "./styles/common";
import { ProductCardContainer } from "./styles/ProductCard";
import "./styles/reset.css";
import { ERROR_MSG } from "./constants/errorMessage";
import ErrorMessage from "./components/ErrorMessage";

type CategoryKey = (typeof CATEGORY)[number];
type SortKey = (typeof SORT)[number];

const categoryQueryMap: Record<CategoryKey, string | undefined> = {
  전체: undefined,
  식료품: "식료품",
  패션잡화: "패션잡화",
};

const sortQueryMap: Record<SortKey, string | undefined> = {
  "순서 없음": undefined,
  "낮은 가격순": "price,asc",
  "높은 가격순": "price,desc",
};

type BasekProductInfo = {
  productId: number;
  basketId: number;
};

type BasekProductInfos = BasekProductInfo[]

function App() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [category, setCategory] = useState<CategoryKey>(CATEGORY[0]);
  const [sort, setSort] = useState<SortKey>(SORT[0]);
  const [basketProductsIds, setBasketProductsIds] = useState<
  BasekProductInfos
  >([]);
  const [error, setError] = useState(false);

  const fetchCartItems = async () => {
    try {
      const data = await getCartItems();
      const mapped: BasekProductInfos = data.map((item) => ({
        productId: item.product.id,
        basketId: item.id,
      }));
      setBasketProductsIds(mapped);
    } catch (error) {
      console.error(ERROR_MSG.BASKET_FETCH_FAIL, error);
      setError(true);
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
        console.error(ERROR_MSG.PRODUCT_FETCH_FAIL, error);
        setError(true);
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
      {error && <ErrorMessage />}
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
          />
        ))}
      </ProductCardContainer>
    </Container>
  );
}

export default App;
