import { deleteCartItem, postCartItem } from "../../api/cartItem";
import { CartItem } from "../../page/ShopPage";
import Button from "../Button/Button";
import {
  contentLayout,
  descriptionLayout,
  imgLayout,
  priceLayout,
  productLayout,
  productNameLayout,
} from "./Product.style";

interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  selectedCartItems: CartItem[];
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
    <div id={id} css={productLayout}>
      <img css={imgLayout} src={imageUrl ?? "./default-img.png"} />
      <div css={contentLayout}>
        <div css={descriptionLayout}>
          <p css={productNameLayout}>{name}</p>
          <p css={priceLayout}>{price}</p>
        </div>
        {isSelected ? RemoveFromCartButton() : AddToCartButton()}
      </div>
    </div>
  );
}
