import { CartQuantityStyle } from './CartQuantity.styles';

const CartQuantity = ({ children }: { children: React.ReactNode }) => {
  return <div css={CartQuantityStyle}>{children}</div>;
};

export default CartQuantity;
