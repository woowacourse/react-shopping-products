import * as S from "./Card.styles";
import { HTMLAttributes } from "react";

interface CardProps {
  children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
  return <S.CardWrapper>{children}</S.CardWrapper>;
}

interface CardPreviewProps {
  children: React.ReactNode;
}

Card.Preview = ({ children }: CardPreviewProps) => {
  return <S.CardPreview>{children}</S.CardPreview>;
};

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

Card.Content = ({ children, ...props }: CardContentProps) => {
  return <S.CardContent {...props}>{children}</S.CardContent>;
};
