import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";

const dummy = [
  { id: 1, isAdded: false },
  { id: 2, isAdded: true },
  { id: 3, isAdded: true },
  { id: 4, isAdded: false },
];

function ProductCardList() {
  return (
    <div css={CardListContainer}>
      {dummy.map((data) => (
        <ProductCard key={data.id} isAdded={data.isAdded} />
      ))}
    </div>
  );
}

export default ProductCardList;
