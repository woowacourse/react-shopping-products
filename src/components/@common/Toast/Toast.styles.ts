import styled from "@emotion/styled";

export const Toast = styled.div`
  position: absolute;
  width: 90%;
  height: 40px;
  background-color: #ffc9c9;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  text-align: center;
  line-height: 40px;
  top: 64px;
  left: 50%;
  transform: translateX(-50%);
`;
