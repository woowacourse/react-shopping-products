import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ERROR_TYPE } from "../../hooks/useError";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import { useData } from "../../hooks/useData";

interface ProductCardListProps {
  setErrorTrue: (type: ERROR_TYPE) => void;
}

function ProductCardList({ setErrorTrue }: ProductCardListProps) {
  const { products, isLoading } = useData();

  if (isLoading) return <ProductCardListSkeleton />;

  return (
    <div css={CardListContainer}>
      {products?.content.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          setErrorTrue={setErrorTrue}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
