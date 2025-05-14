import { css } from "@emotion/react";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Button/Button";
import { deleteCartItem, getCartItem, postCartItem } from "../../api/cartItem";

interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  selectedProducts: string[];
  setSelectedProducts: Dispatch<SetStateAction<string[]>>;
}

interface ProductItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}
interface CartItem {
  id: number;
  quantity: number;
  product: ProductItem;
}

const productLayout = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 8px;
  border-radius: 8px;
  width: 182px;
  height: 224px;
  gap: 15px;
`;

const imgLayout = css`
  border-radius: 8px 8px 0 0;
  width: 100%;
  height: 50%;
`;

const contentLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 27px;
  width: 100%;
  height: 50%;
`;

const descriptionLayout = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
`;

const productNameLayout = css`
  font-size: 14px;
  font-weight: 700;
`;

const priceLayout = css`
  font-size: 12px;
  font-weight: 500;
`;

export default function Product({
  id,
  imageUrl,
  name,
  price,
  selectedProducts,
  setSelectedProducts,
}: ProductProps) {
  const [isSelected, setIsSelected] = useState(false);

  const getCartItemId = async ({ deleteId }: { deleteId: number }) => {
    const response = await getCartItem({
      sortBy: "asc",
    });

    const deleteCartId = response.content.map((cartItem: CartItem) => {
      if (deleteId === cartItem.product.id) return cartItem.id;
    });
    return deleteCartId;
  };

  const handleClick = async () => {
    setIsSelected((prev) => !prev);
    if (selectedProducts.includes(id)) {
      setSelectedProducts((arr) => arr.filter((prev) => prev !== id));
      const deleteCartId = await getCartItemId({ deleteId: Number(id) });
      deleteCartItem({ id: deleteCartId });
    } else {
      setSelectedProducts((arr) => [...arr, id]);
      postCartItem({ productId: Number(id), quantity: 1 });
    }
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
