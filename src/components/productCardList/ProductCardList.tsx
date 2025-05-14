import { useEffect } from "react";
import request from "../../utils/request";
import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";

interface ProductCardListProps {
  products: ProductPageResponse | null;
  setProducts: (data: ProductPageResponse) => void;
}

function ProductCardList({ products, setProducts }: ProductCardListProps) {
  const isAdded = true;
  useEffect(() => {
    (async () => {
      const data: ProductPageResponse = await request({
        method: "GET",
        url: "/products",
      });
      console.log(data);
      setProducts(data);
    })();
  }, [setProducts]);

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
