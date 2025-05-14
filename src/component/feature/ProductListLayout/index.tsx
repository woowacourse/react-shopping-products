import { productListLayoutStyle } from './ProductListLayout.styles';

const ProductListLayout = ({ children }: { children: React.ReactNode }) => {
  return <div css={productListLayoutStyle}>{children}</div>;
};

export default ProductListLayout;
