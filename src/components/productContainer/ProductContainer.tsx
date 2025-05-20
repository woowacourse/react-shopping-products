import { useState } from "react";
import Filter from "../filter/Filter";
import ProductCardList from "../productCardList/ProductCardList";
import Sort from "../sort/Sort";
import { Container, SelectContainer, Title } from "./ProductContainer.css";
import { categoryType, sortType } from "../../types/index.types";
interface ProductContainerProps {
  cartItemIds: Record<"productId" | "cartId", number>[];
  setCartItemIds: React.Dispatch<
    React.SetStateAction<Record<"productId" | "cartId", number>[]>
  >;
  fetchCartProducts: () => void;
}
function ProductContainer({
  cartItemIds,
  setCartItemIds,
  fetchCartProducts,
}: ProductContainerProps) {
  const [selectedCategory, setSelectedCategory] =
    useState<categoryType>("전체");
  const [selectedSort, setSelectedSort] = useState<sortType>("낮은 가격순");

  return (
    <div css={Container}>
      <h2 css={Title}>bpple 상품 목록</h2>
      <div css={SelectContainer}>
        <Filter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Sort selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      </div>
      <ProductCardList
        category={selectedCategory}
        sort={selectedSort}
        cartItemIds={cartItemIds}
        setCartItemIds={setCartItemIds}
        fetchCartProducts={fetchCartProducts}
      />
    </div>
  );
}

export default ProductContainer;
