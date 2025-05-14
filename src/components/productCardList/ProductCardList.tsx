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
  cartItemIds: number[];
  setCartItemIds: React.Dispatch<React.SetStateAction<number[]>>;
}

function ProductCardList({
  products,
  setProducts,
  category,
  sort,
  cartItemIds,
  setCartItemIds,
}: ProductCardListProps) {
  useFetchProducts({ category, setProducts, sort });
  console.log(cartItemIds);

  return (
    <div css={CardListContainer}>
      {products?.content.map((data) => (
        <ProductCard
          id={data.id}
          key={data.id}
          isAdded={cartItemIds?.includes(data.id)}
          name={data.name}
          price={data.price}
          imageUrl={data.imageUrl}
          setCartItemIds={setCartItemIds}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
