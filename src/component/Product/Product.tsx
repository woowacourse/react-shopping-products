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
  selectedCardItems: CartItem[];
  onChange: () => void;
}

export default function Product({
  id,
  imageUrl,
  name,
  price,
  selectedCardItems,
  onChange,
}: ProductProps) {
  const isSelected = selectedCardItems.length !== 0;

  const handleClick = async () => {
    if (isSelected)
      await deleteCartItem({ id: Number(selectedCardItems[0].id) });
    else await postCartItem({ productId: Number(id), quantity: 1 });
    onChange();
  };

  const addProduct = () => {
    return (
      <Button onClick={handleClick}>
        <img src="./add-shopping-cart.svg" />
        <p>담기</p>
      </Button>
    );
  };

  const removeProduct = () => {
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
        {isSelected ? removeProduct() : addProduct()}
      </div>
    </div>
  );
}
