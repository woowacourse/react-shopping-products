import {
  contentLayout,
  descriptionLayout,
  imgLayout,
  priceLayout,
  productImg,
  productLayout,
  productNameLayout,
  soldOutLayout,
} from "./Product.style";

interface ProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  maxQuantity?: number;
  children: React.ReactNode;
}

export default function Product({
  id,
  imageUrl,
  name,
  price,
  maxQuantity,
  children,
}: ProductProps) {
  return (
    <div data-testid="product-component" id={id.toString()} css={productLayout}>
      <div css={imgLayout}>
        {maxQuantity === 0 && <div css={soldOutLayout}>품절</div>}
        <img css={productImg} src={imageUrl ?? "./default-img.png"} />
      </div>
      <div css={contentLayout}>
        <div css={descriptionLayout}>
          <p css={productNameLayout}>{name}</p>
          <p css={priceLayout}>{price}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
