import styled from "styled-components";

export const ObserverTarget = styled.div<{ $isObserverActive: boolean }>`
  height: 10px;

  display: ${({ $isObserverActive }) => ($isObserverActive ? "block" : "none")};
`;
