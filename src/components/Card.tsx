import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

interface CardProps {
  children: React.ReactNode;
}
const Card = ({ children }: CardProps) => {
  return <div css={cardStyle}>{children}</div>;
};

interface CardPreviewProps {
  children: React.ReactNode;
}

Card.Preview = ({ children }: CardPreviewProps) => {
  return <div css={previewStyle}>{children}</div>;
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Card.Content = ({ children, ...props }: CardContentProps) => {
  return (
    <div css={cardContentStyle} {...props}>
      {children}
    </div>
  );
};

export default Card;

const cardStyle = css`
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

const cardContentStyle = css`
  padding: 15px 8px 8px;
`;
