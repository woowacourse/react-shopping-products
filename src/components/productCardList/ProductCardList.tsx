import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";

const dummy = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

function ProductCardList() {
  return (
    <div css={CardListContainer}>
      {dummy.map((data) => (
        <ProductCard key={data.id} />
      ))}
    </div>
  );
}

export default ProductCardList;
