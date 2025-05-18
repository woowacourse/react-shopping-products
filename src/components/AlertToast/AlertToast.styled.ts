import styled from "@emotion/styled";

interface ToastTypeProps {
  type: "error" | "success";
}

export const Container = styled.div<ToastTypeProps>`
  width: 500px;
  position: fixed;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ type }) =>
    type === "success" ? "#4caf50" : "#ff4d4d"};
  color: #0a0d13;
  z-index: 999;
`;

export const Message = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
