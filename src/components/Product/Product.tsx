import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

interface ProductProps {
  children: React.ReactNode;
}
interface ProductPreviewProps {
  children: React.ReactNode;
}
interface ProductContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Product = ({ children }: ProductProps) => {
  return <div css={productStyle}>{children}</div>;
};

Product.Preview = ({ children }: ProductPreviewProps) => {
  return <div css={previewStyle}>{children}</div>;
};

Product.Content = ({ children, ...props }: ProductContentProps) => {
  return (
    <div css={productContentStyle} {...props}>
      {children}
    </div>
  );
};

export default Product;

const productStyle = css`
  max-width: 166px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
`;

const previewStyle = css`
  max-height: 112px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const productContentStyle = css`
  padding: 15px 8px 8px;
`;
