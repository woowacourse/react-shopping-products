import styled from "@emotion/styled";

const DEFAULT_IMAGE_URL = "/default-image.webp";

const isValidUrl = (url: string) =>
  url && (url.startsWith("http://") || url.startsWith("https://"));

export const ProductContainer = styled.div`
  display: flex;
  width: 182px;
  height: 224px;
  flex-direction: column;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #0000001a;
`;

export const ProductImage = styled.div<{ $url: string }>`
  width: 100%;
  height: 50%;
  background: no-repeat
    url(${({ $url }) => (isValidUrl($url) ? $url : DEFAULT_IMAGE_URL)});
  background-size: cover;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #0000001a;
  position: relative;
`;

export const SoldOutOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000080;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0 0;
  color: white;
  font-weight: 600;
  font-size: 30px;
`;

export const ProductWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 8px 8px;
  border-radius: 0 0 8px 8px;
  height: 50%;
  position: relative;
  border-top: none;
`;

export const ProductName = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #0a0d13;
  margin-bottom: 6px;
`;

export const ProductPrice = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #0a0d13;
`;

export const QuantityWrapper = styled.div`
  position: absolute;
  right: 8px;
  bottom: 8px;
`;
