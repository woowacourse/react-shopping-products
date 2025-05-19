import { CartQuantityStyle } from './CardQuantity.styles';

const CardQuantity = ({ children }: { children: React.ReactNode }) => {
  return <div css={CartQuantityStyle}>{children}</div>;
};

export default CardQuantity;
