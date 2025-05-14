import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";
import useFetchProducts from "../../hooks/useFetchProducts";
import { categoryType, sortType } from "../../types/index.types";

interface ProductCardListProps {
  products: ProductPageResponse | null;
  setProducts: (data: ProductPageResponse) => void;
  category: categoryType;
  sort: sortType;
}

function ProductCardList({
  products,
  setProducts,
  category,
  sort,
}: ProductCardListProps) {
  const isAdded = false;
  useFetchProducts({ category, setProducts, sort });

  return (
    <div css={CardListContainer}>
      {products?.content.map((data) => (
        <ProductCard
          id={data.id}
          key={data.id}
          isAdded={isAdded}
          name={data.name}
          price={data.price}
          imageUrl={data.imageUrl}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
