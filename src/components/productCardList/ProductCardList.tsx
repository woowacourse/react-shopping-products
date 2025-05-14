import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";
import useFetchProducts from "../../hooks/useFetchProducts";

interface ProductCardListProps {
  products: ProductPageResponse | null;
  setProducts: (data: ProductPageResponse) => void;
  category: "전체" | "식료품" | "패션잡화";
}

function ProductCardList({
  products,
  setProducts,
  category,
}: ProductCardListProps) {
  const isAdded = true;
  useFetchProducts({ category, setProducts });
  return (
    <div css={CardListContainer}>
      {products?.content.map((data) => (
        <ProductCard
          key={data.id}
          isAdded={isAdded}
          category={data.category}
          name={data.name}
          price={data.price}
          imageUrl={data.imageUrl}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
