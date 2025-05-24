import styled from "@emotion/styled";

const DEFAULT_IMAGE_URL = "./default-image.webp";

const isValidUrl = (url: string) =>
  url && (url.startsWith("http://") || url.startsWith("https://"));

export const CartItem = styled.div`
  width: 100%;
  height: 80px;
  padding-top: 8px;
  border-top: 1px solid #0000001a;
  display: flex;
  gap: 16px;
`;

export const CartItemImage = styled.div<{ $url: string }>`
  width: 80px;
  height: 80px;
  background: no-repeat
    url(${({ $url }) => (isValidUrl($url) ? $url : DEFAULT_IMAGE_URL)});
  background-size: cover;
  border-radius: 8px;
`;

export const CartItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const CartItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
`;

export const CartItemName = styled.p`
  font-weight: 700;
  font-size: 16px;
`;

export const CartItemPrice = styled.p`
  font-weight: 500;
  font-size: 12px;
`;

export const DeleteButton = styled.button`
  cursor: pointer;
  background: none;
  margin: 0;
  padding: 0;
  border: 1px solid #0000001a;
  border-radius: 4px;
  width: 40px;
  height: 24px;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;

  &:active {
    border-color: rgb(230, 230, 230);
    background-color: #f0f0f0;
    transform: scale(0.95);
  }
`;
