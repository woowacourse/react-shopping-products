import styled from "@emotion/styled";
import { css } from "@emotion/react";

type CartActionButtonProps = {
  variant: "add" | "remove";
  onClick: () => void;
};

const CartActionButton = ({ variant, onClick }: CartActionButtonProps) => {
  return (
    <Button onClick={onClick} variant={variant}>
      {variant === "add" ? <AddIcon /> : <RemoveIcon />}
      {variant === "add" ? "담기" : "빼기"}
    </Button>
  );
};

export default CartActionButton;

const AddIcon = () => {
  return <Image src="./addToCartIcon.png" alt="add-button" />;
};

const RemoveIcon = () => {
  return <Image src="./removeFromCartIcon.png" alt="remove-button" />;
};

const Image = styled.img`
  width: 17px;
  height: 17px;
`;

const buttonVariantStyle = {
  add: {
    backgroundColor: "black",
    color: "white",
    hoverColor: "#333",
  },
  remove: {
    backgroundColor: "#EAEAEA",
    color: "black",
    hoverColor: "#D0D0D0",
  },
};

const Button = styled.button<CartActionButtonProps>`
  ${({ variant }) => {
    const style = buttonVariantStyle[variant];
    return css`
      background-color: ${style.backgroundColor};
      color: ${style.color};
      border: none;
      width: 70px;
      height: 30px;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 6px;
      cursor: pointer;

      &:hover {
        background-color: ${style.hoverColor};
      }

      &:active {
        background-color: gray;
      }
    `;
  }}
`;
