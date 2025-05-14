import { useEffect, useState } from "react";
import request from "../../utils/request";
import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import { ProductPageResponse } from "../../types/response.types";

function ProductCardList() {
  const [products, setProducts] = useState<ProductPageResponse | null>(null);
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
  }, []);
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
