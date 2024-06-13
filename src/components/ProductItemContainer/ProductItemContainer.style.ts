import styled from "styled-components";

export const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 16px;
  margin-top: 28px;

  min-height: 100vh;
`;

export const ObserverTarget = styled.div<{ $isActive: boolean }>`
  height: 10px;

  display: ${({ $isActive }) => ($isActive ? "block" : "none")};
`;
