import {
  contentLayout,
  descriptionLayout,
  imgLayout,
  priceLayout,
  productLayout,
  productNameLayout,
} from "./Product.style";

interface ProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  children: React.ReactNode;
}

export default function Product({
  id,
  imageUrl,
  name,
  price,
  children,
}: ProductProps) {
  return (
    <div id={id.toString()} css={productLayout}>
      <img css={imgLayout} src={imageUrl ?? "./default-img.png"} />
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
