import Button from "../../unit/Button/Button";
import { QuantitySelector } from "../../unit/QuantitySelector/QuantitySelector";
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
}

export function CartProduct({ id, imageUrl, name, price }: CartProductProps) {
  return (
    <section
      id={`cartProduct-${id}`}
      aria-label={`${id} 항목`}
      css={CartProductLayout}
    >
      <img src={imageUrl} css={ProductImg} />
      <div css={TitleLayout}>
        <p css={ProductName}>{name}</p>
        <p css={ProductPrice}>{price}</p>
        <QuantitySelector />
      </div>
      <div css={deleteButton}>
        <Button onClick={() => console.log("삭제")} style="ghost">
          삭제
        </Button>
      </div>
    </section>
  );
}
