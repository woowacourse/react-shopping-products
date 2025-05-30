import styled from "@emotion/styled";

export const QuantityControllerWrapper = styled.div<{
  size?: "default" | "small";
}>`
  display: flex;
  align-items: center;
  gap: ${({ size }) => (size === "small" ? "5px" : "10px")};
`;

export const Button = styled.button<{ size?: "default" | "small" }>`
  width: ${({ size }) => (size === "small" ? "25px" : "30px")};
  height: ${({ size }) => (size === "small" ? "25px" : "30px")};
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f4f4f4;
    border-color: #999;
  }

  img {
    width: ${({ size }) => (size === "small" ? "12px" : "16px")};
    height: ${({ size }) => (size === "small" ? "12px" : "16px")};
  }
`;

export const Count = styled.div<{ size?: "default" | "small" }>`
  font-size: ${({ size }) => (size === "small" ? "12px" : "16px")};
  min-width: ${({ size }) => (size === "small" ? "20px" : "30px")};
  font-weight: 500;
  text-align: center;
`;
