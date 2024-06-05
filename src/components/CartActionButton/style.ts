import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const ButtonWrapper = styled.button`
  ${flexCenter};
  width: 59px;
  height: 24px;
  padding: 4px 8px 4px 8px;
  gap: 4px;
  border-radius: 4px;
  opacity: 0px;
  background-color: ${({ theme }) => theme.COLOR.black};
  color: ${({ theme }) => theme.COLOR.white};
  cursor: pointer;
`;
