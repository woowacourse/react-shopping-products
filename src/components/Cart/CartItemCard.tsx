import { css } from "@emotion/react";
import { HTMLAttributes } from "react";
import Text from "../common/Text";

interface CartItemCardProps {
  children: React.ReactNode;
}

interface ProductCardImageProps {
  src: string;
  alt: string;
}

interface ProductCardContentProps {
  children: React.ReactNode;
  gap?: number;
}

interface ProductCardTitleProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
}

interface ProductCardPriceProps extends HTMLAttributes<HTMLSpanElement> {
  price: number;
}

const CartItemCard = ({ children }: CartItemCardProps) => {
  return <div css={CartItemCardStyle}>{children}</div>;
};

CartItemCard.Image = ({ src, alt }: ProductCardImageProps) => {
  return (
    <div css={imageContainerStyle}>
      <img
        src={src}
        alt={alt}
        css={imageStyle}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg";
        }}
      />
    </div>
  );
};

CartItemCard.Content = ({ children }: ProductCardContentProps) => {
  return <div css={contentStyle}>{children}</div>;
};

CartItemCard.Title = ({ text, ...props }: ProductCardTitleProps) => {
  return (
    <Text variant="title-2" {...props}>
      {text}
    </Text>
  );
};

CartItemCard.Price = ({ price, ...props }: ProductCardPriceProps) => {
  return (
    <Text variant="body-2" {...props}>
      {price.toLocaleString()}원
    </Text>
  );
};

export default CartItemCard;

const CartItemCardStyle = css`
  position: relative;
  width: 100%;
  height: max-content;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 8px 0 24px;
  display: flex;
  gap: 16px;
`;

const imageContainerStyle = css`
  max-width: 80px;
  min-width: 80px;
  max-height: 80px;
  border-radius: 8px;
  overflow: hidden;
`;

const imageStyle = css`
  width: 100%;
  height: 80px;
  object-fit: cover;
`;

const contentStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
