import Button from "../../../../components/Button/Button";
import { QuantitySelector } from "../QuantitySelector/QuantitySelector";
import {
  CartProductLayout,
  deleteButton,
  ProductImg,
  ProductName,
  ProductPrice,
  TitleLayout,
} from "./CartProduct.style";

interface CartProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
  onChange: () => void;
}

export function CartProduct({
  id,
  imageUrl,
  name,
  price,
  quantity,
  maxQuantity,
  onChange,
}: CartProductProps) {
  return (
    <section
      id={`cartProduct-${id}`}
      aria-label={`${id} 항목`}
      css={CartProductLayout}
      data-testid="cart-product"
    >
      <img src={imageUrl} css={ProductImg} />
      <div css={TitleLayout}>
        <p css={ProductName}>{name}</p>
        <p css={ProductPrice}>{price.toLocaleString()}원</p>
        <QuantitySelector
          quantity={quantity}
          cartId={id}
          onChange={onChange}
          maxQuantity={maxQuantity}
        />
      </div>
      <div css={deleteButton}>
        <Button onClick={() => console.log("삭제")} style="ghost">
          삭제
        </Button>
      </div>
    </section>
  );
}
