import {
  ProductCardWrapper,
  ProductCardDetailWrapper,
  ProductCardDetailTextWrapper,
  ProductCardName,
  ProductCardPrice,
  ProductImage,
} from "../styles/ProductCard";
import { IMAGE_PATH } from "../constants/imagePath";
import CartToggleButton from "./CartToggleButton";
import { useEffect, useRef } from "react";

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isInBascket: boolean;
  basketId?: number;
  isNotBasketCountMAX: boolean;
  setError: (value: boolean) => void;
};

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  isInBascket,
  basketId,
  isNotBasketCountMAX,
  setError,
}: ProductCardProps) => {
  const defaultSrc =
    category === "패션잡화"
      ? IMAGE_PATH.DEFAULT_FASHION
      : IMAGE_PATH.DEFAULT_GROCERY;
  const imageSrc = imageUrl ? imageUrl : defaultSrc;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  return (
    <ProductCardWrapper>
      <ProductImage
        src={imageSrc}
        alt={name}
        onError={(e) => {
          const target = e.currentTarget;
          target.src = defaultSrc;
        }}
      />
      <ProductCardDetailWrapper>
        <ProductCardDetailTextWrapper>
          <ProductCardName>{name}</ProductCardName>
          <ProductCardPrice>{price.toLocaleString()}원</ProductCardPrice>
        </ProductCardDetailTextWrapper>
        <CartToggleButton
          id={id}
          isInBascket={isInBascket}
          basketId={basketId}
          isNotBasketCountMAX={isNotBasketCountMAX}
          setError={setError}
          timeoutRef={timeoutRef}
        />
      </ProductCardDetailWrapper>
    </ProductCardWrapper>
  );
};

export default ProductCard;
