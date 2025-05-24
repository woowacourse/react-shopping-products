import styled from "@emotion/styled";

export const Item = styled.li<{ variant?: "default" | "cart" }>`
  display: flex;
  gap: 16px;

  ${({ variant }) =>
    variant === "cart"
      ? `
    justify-content: space-between;
    align-items: center;
    width: 100%;

  `
      : `
    flex-direction: column;
    border: 1px solid #eaeaea;
  `};
  border-radius: 8px;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ProductName = styled.p`
  color: #0a0d13;
  font-size: 14px;
  font-weight: 700;
`;

export const ProductPrice = styled.p`
  color: #0a0d13;
  font-size: 12px;
  font-weight: 500;
`;

export const ImageWrapper = styled.div<{ variant?: "default" | "cart" }>`
  ${({ variant }) =>
    variant === "cart"
      ? `
    width: 80px;
    height: 80px;
    flex-shrink: 0;
  `
      : `
    width: 100%;
    aspect-ratio: 1/1;
    max-height: 218px;
  `};
  overflow: hidden;
`;

export const ProductImage = styled.img<{ variant?: "default" | "cart" }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ variant }) =>
    variant === "cart" ? "6px" : "8px 8px 0 0"};
`;

export const Content = styled.div<{ variant?: "default" | "cart" }>`
  display: flex;
  flex-direction: column;

  ${({ variant }) =>
    variant === "cart"
      ? `
      width: 100%;
    justify-content: center;
    flex-grow: 1;
    gap: 12px;
  `
      : `
    padding: 0 8px 8px 8px;
    gap: 20px;
  `};
`;

export const ButtonWrapper = styled.div<{ variant?: "default" | "cart" }>`
  display: flex;
  ${({ variant }) =>
    variant === "cart"
      ? `
    align-items: center;
    gap: 8px;
  `
      : `
    justify-content: right;
  `};
`;
