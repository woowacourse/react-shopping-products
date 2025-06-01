import { css } from "@emotion/react";
import { HTMLAttributes } from "react";
import Text from "../common/Text";

interface ProductCardProps {
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

const ProductCard = ({ children }: ProductCardProps) => {
  return <div css={[productCardStyle, hoverStyle]}>{children}</div>;
};

ProductCard.SoldOutCover = () => {
  return <div css={soldOutCoverContainerStyle}>품절</div>;
};

ProductCard.Image = ({ src, alt }: ProductCardImageProps) => {
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

ProductCard.Content = ({ children }: ProductCardContentProps) => {
  return <div css={[contentStyle]}>{children}</div>;
};

ProductCard.Title = ({ text, ...props }: ProductCardTitleProps) => {
  return (
    <Text variant="title-2" {...props}>
      {text}
    </Text>
  );
};

ProductCard.Price = ({ price, ...props }: ProductCardPriceProps) => {
  return (
    <Text variant="body-2" {...props}>
      {price.toLocaleString()}원
    </Text>
  );
};

export default ProductCard;

const productCardStyle = css`
  position: relative;
  width: 166px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  background-color: white;
  transition: transform 0.2s ease-in-out;
`;

const hoverStyle = css`
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  }
`;

const imageContainerStyle = css`
  max-height: 112px;
  overflow: hidden;
`;

const imageStyle = css`
  width: 100%;
  height: 112px;
  object-fit: cover;
`;

const contentStyle = css`
  height: 120px;
  padding: 15px 8px 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const soldOutCoverContainerStyle = css`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 35px;
  font-weight: 600;
  letter-spacing: 3.5px;
`;
