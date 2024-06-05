import { HTMLAttributes } from "react";
import { Wrapper } from "./Cart.style";

interface CartProps extends HTMLAttributes<HTMLDivElement> {}

const Cart = ({ ...rest }: CartProps) => {
  return <Wrapper {...rest}></Wrapper>;
};

export default Cart;
