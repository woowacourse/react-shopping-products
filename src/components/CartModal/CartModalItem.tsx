import { css } from "@emotion/css";
import Button from "../Button";
import Stepper from "../Stepper";
import { CartItem } from "../../types/product.type";
import { useCartItemQuantity } from "../../hooks/useCartItemQuantity";

interface CartModalItemProps {
  cartItem: CartItem;
  name: string;
  imgUrl: string;
  price: number;
}

const CartModalItem = ({
  cartItem,
  name,
  imgUrl,
  price,
}: CartModalItemProps) => {
  const {
    isLoading,
    localQuantity,
    handleOnIncrease,
    handleOnDecrease,
    handleDelete,
  } = useCartItemQuantity(cartItem);

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
            <Stepper
              quantity={localQuantity}
              onDecreaseQuantity={handleOnDecrease}
              onIncreaseQuantity={handleOnIncrease}
              isLoading={isLoading}
            />
          </div>
        </div>
        <Button
          title={"삭제"}
          onClick={handleDelete}
          buttonStyled={{ width: "40px", height: "24px" }}
          textStyled={{ fontSize: "12px" }}
          isLoading={isLoading}
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
