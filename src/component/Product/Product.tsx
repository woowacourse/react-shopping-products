import { css } from "@emotion/react";
import { deleteCartItem, postCartItem } from "../../api/cartItem";
import Button from "../Button/Button";
import { CartItem } from "../../page/ShopPage";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface ProductProps {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  selectedCardItems: CartItem[];
  setSelectedProducts: Dispatch<SetStateAction<number>>;
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
  selectedCardItems,
  setSelectedProducts,
}: ProductProps) {
  const [isSelected, setIsSelected] = useState(selectedCardItems.length !== 0);
  // const cartItemId = selectedCardItems[0] ? : 0;

  const handleClick = async () => {
    if (isSelected) {
      deleteCartItem({ id: Number(selectedCardItems[0].id) });
      // setIsSelected(false);
      setSelectedProducts((prev) => prev - 1);
    } else {
      // setIsSelected(true);
      postCartItem({ productId: Number(id), quantity: 1 });
      setSelectedProducts((prev) => prev + 1);
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

  useEffect(() => {
    setIsSelected(selectedCardItems.length !== 0);
    console.log(id, selectedCardItems);
  }, [selectedCardItems]);

  useEffect(() => {
    console.log(id, isSelected);
  }, [isSelected]);

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
