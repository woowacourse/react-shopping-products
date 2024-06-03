import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  border: 3px solid #f091a1;
  font-weight: 700;
  color: #f091a1;
  position: fixed;
  right: 40px;
  bottom: 40px;
  ${flexCenter}

  &:hover {
    border: 3px solid #d1406b;
    color: #d1406b;
  }
`;
