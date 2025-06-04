import styled from "@emotion/styled";
import { css } from "@emotion/react";

type CartActionButtonProps = {
  variant: "add" | "remove";
  onClick: () => void;
  testId: string;
};

const CartActionButton = ({
  variant,
  onClick,
  testId,
}: CartActionButtonProps) => {
  return (
    <Button onClick={onClick} variant={variant} data-testid={testId}>
      {variant === "add" && <AddIcon />}
      {variant === "add" ? "담기" : "삭제"}
    </Button>
  );
};

export default CartActionButton;

const AddIcon = () => {
  return <Image src="./addToCartIcon.png" alt="add-button" />;
};

const Image = styled.img`
  width: 17px;
  height: 17px;
`;

const buttonVariantStyle = {
  add: {
    width: "70px",
    height: "30px",
    backgroundColor: "black",
    color: "white",
    hoverColor: "#333",
    border: "none",
  },
  remove: {
    width: "40px",
    height: "24px",
    backgroundColor: "white",
    color: "black",
    hoverColor: "#D0D0D0",
    border: "solid 1px lightgray",
  },
};

// const Button = styled.button<CartActionButtonProps>`
//   ${({ variant }) => {
//     const style = buttonVariantStyle[variant];
//     return css`
//       background-color: ${style.backgroundColor};
//       color: ${style.color};
//       width: ${style.width};
//       height: ${style.height};
//       border-radius: 4px;
//       border: ${style.border};
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       gap: 6px;
//       cursor: pointer;

//       &:hover {
//         background-color: ${style.hoverColor};
//       }

//       &:active {
//         background-color: gray;
//       }
//     `;
//   }}
// `;

const Button = styled.button<{ variant: "add" | "remove" }>`
  ${({ variant }) => {
    const style = buttonVariantStyle[variant];
    return css`
      background-color: ${style.backgroundColor};
      color: ${style.color};
      width: ${style.width};
      height: ${style.height};
      border-radius: 4px;
      border: ${style.border};
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
