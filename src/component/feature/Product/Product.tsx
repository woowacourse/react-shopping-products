import { deleteCartItem, postCartItem } from "../../../api/cartItem";
import { CartItemType } from "../../../types/cartItem";

import Button from "../../unit/Button/Button";
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
  selectedCartItems: CartItemType[];
  onChange: () => void;
}

export default function Product({
  id,
  imageUrl,
  name,
  price,
  selectedCartItems,
  onChange,
}: ProductProps) {
  const isSelected = selectedCartItems.length !== 0;

  const AddToCartButton = () => {
    const handleClick = async () => {
      await postCartItem({ productId: Number(id), quantity: 1 });
      onChange();
    };

    return (
      <Button onClick={handleClick}>
        <img src="./add-shopping-cart.svg" />
        <p>담기</p>
      </Button>
    );
  };

  const QuantitySelector = () => {
    return <></>;
  };

  const RemoveFromCartButton = () => {
    const handleClick = async () => {
      await deleteCartItem({ id: Number(selectedCartItems[0].id) });
      onChange();
    };

    return (
      <Button onClick={handleClick} style="secondary">
        <img src="./remove-shopping-cart.svg" />
        <p>빼기</p>
      </Button>
    );
  };

  return (
    <div id={id.toString()} css={productLayout}>
      <img css={imgLayout} src={imageUrl ?? "./default-img.png"} />
      <div css={contentLayout}>
        <div css={descriptionLayout}>
          <p css={productNameLayout}>{name}</p>
          <p css={priceLayout}>{price}</p>
        </div>
        {isSelected ? RemoveFromCartButton() : QuantitySelector()}
      </div>
    </div>
  );
}
