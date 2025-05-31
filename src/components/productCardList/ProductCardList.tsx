import ProductCard from "../productCard/ProductCard";
import { CardListContainer } from "./ProductCardList.css";
import ProductCardListSkeleton from "../productCardListSkeleton/ProductCardListSkeleton";
import { useCartProduct } from "../../hooks/useCartProduct";
import { useState } from "react";

function ProductCardList() {
  const { products } = useCartProduct();
  const [toggleStates, setToggleStates] = useState<Record<number, boolean>>({});

  const toggleButton = (productId: number, value: boolean) => {
    setToggleStates((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  if (!products) return <ProductCardListSkeleton />;

  return (
    <div css={CardListContainer}>
      {products?.content.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isToggled={!!toggleStates[product.id]}
          isSoldOut={product.quantity === 0}
          setToggle={(val) => toggleButton(product.id, val)}
        />
      ))}
    </div>
  );
}

export default ProductCardList;
