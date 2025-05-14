import styled from "@emotion/styled";

export const Container = styled.div`
  width: 500px;
  position: fixed;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc9c9;
  color: #0a0d13;
  z-index: 999;
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  font-weight: 500;
`;
