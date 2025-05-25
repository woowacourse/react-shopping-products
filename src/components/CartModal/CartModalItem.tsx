import { css } from "@emotion/css";
import ProductStepper from "../ProductStepper/ProductStepper";
import Button from "../Button";
import deleteShoppingCart from "../../APIs/shoppingCart/deleteShoppingCart";
import { useAPIContext } from "../../contexts/API/useAPIContext";
import getShoppingCart from "../../APIs/shoppingCart/getShoppingCart";
import { useState } from "react";
import updateCartItemQuantity from "../../APIs/shoppingCart/updateCartItemQuantity";
import { useErrorContext } from "../../contexts/Error/ErrorContext";

interface CartModalItemProps {
  name: string;
  imgUrl: string;
  price: number;
  quantity: number;
  cartItemId: number;
}

const CartModalItem = ({
  cartItemId,
  name,
  imgUrl,
  price,
  quantity,
}: CartModalItemProps) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const { refetch: refetchCart } = useAPIContext({
    name: "cartItems",
    fetcher: () => getShoppingCart({ endpoint: "/cart-items" }),
  });
  const { handleError } = useErrorContext();

  const handleQuantityChange = async (newQuantity: number) => {
    setLocalQuantity(newQuantity);

    try {
      await updateCartItemQuantity({
        endpoint: `/cart-items/${cartItemId}`,
        requestBody: {
          quantity: newQuantity,
        },
      });
      refetchCart();
    } catch (err) {
      handleError({
        isError: true,
        errorMessage: "장바구니 수량 업데이트에 실패했습니다.",
      });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteShoppingCart({ endpoint: "/cart-items", cartItemId });
      refetchCart();
    } catch (err) {
      handleError({
        isError: true,
        errorMessage: "장바구니에서 삭제하지 못하였습니다.",
      });
    }
  };

  return (
    <div className={itemStyles}>
      <hr className={hrStyles} />
      <div className={infoStyles}>
        <div className={contentStyles}>
          <img
            src={imgUrl || "./default.png"}
            className={imageStyles}
            onError={(e) => {
              e.currentTarget.src = "./default.png";
            }}
          />
          <div className={textContainerStyles}>
            <div className={nameStyles}>{name}</div>
            <div className={priceStyles}>{price}</div>
            <ProductStepper
              quantity={localQuantity}
              onDecreaseQuantity={() =>
                localQuantity > 0
                  ? handleQuantityChange(localQuantity - 1)
                  : handleQuantityChange(0)
              }
              onIncreaseQuantity={() => handleQuantityChange(localQuantity + 1)}
            />
          </div>
        </div>
        <Button
          title={"삭제"}
          onClick={handleDelete}
          buttonStyled={{ width: "40px", height: "24px" }}
          textStyled={{ fontSize: "12px" }}
        />
      </div>
    </div>
  );
};

export default CartModalItem;

const itemStyles = css`
  width: 100%;
`;

const hrStyles = css`
  border: 1px solid #e5e5e5;
`;

const infoStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
`;

const contentStyles = css`
  display: flex;
  gap: 16px;
`;

const imageStyles = css`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const nameStyles = css`
  font-weight: 700;
  font-size: 18px;
`;

const priceStyles = css`
  font-weight: 500;
  font-size: 15px;
`;

const textContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
